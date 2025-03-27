import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import argparse
import os
import sys

def create_comprehension_comparison_csv(output_file='comprehension_comparison.csv'):
    """
    Creates a CSV file comparing comprehension ratings between control and experimental groups
    
    Parameters:
    output_file (str): Name of the output CSV file
    """
    # Add this to help with import
    import sys
    sys.path.append('.')
    
    try:
        # Import data only when generating CSV
        from make_csv_comp import websites, ratings
    except ImportError as e:
        print(f"Error importing data: {e}")
        print("Make sure make_csv_comp.py is in the same directory")
        sys.exit(1)
    
    # Websites to analyze
    target_websites = ['Google', 'Reddit', 'Amazon', 'DuckDuckGo', 'Wikipedia']
    
    # Define participant groups
    groups = {
        'A': ['P1', 'P5', 'P9'],
        'B': ['P2', 'P6', 'P10'],
        'C': ['P3', 'P7', 'P11'],
        'D': ['P4', 'P8', 'P12']
    }
    
    # Groups using extension for first half (experimental for target websites)
    experimental_groups = ['B', 'C']
    control_groups = ['A', 'D']
    
    # Get participants for each condition
    experimental_participants = [p for g in experimental_groups for p in groups[g]]
    control_participants = [p for g in control_groups for p in groups[g]]
    
    # Initialize results list
    results = []
    
    # Process each website
    for website in target_websites:
        website_index = websites.index(website)
        
        # Get all control ratings
        control_ratings = []
        for participant in control_participants:
            rating = round(ratings[participant][website_index][1])  # Get comprehension rating and round
            control_ratings.append(rating)
            
        # Get all experimental ratings
        experimental_ratings = []
        for participant in experimental_participants:
            rating = round(ratings[participant][website_index][1])  # Get comprehension rating and round
            experimental_ratings.append(rating)
        
        # Debug print statements
        print(f"Website: {website}")
        print(f"Control Ratings: {control_ratings}")
        print(f"Experimental Ratings: {experimental_ratings}")
        
        # Create rows with counts for each rating value (1-7)
        control_counts = pd.Series(control_ratings).value_counts()
        experimental_counts = pd.Series(experimental_ratings).value_counts()
        
        # Add control row
        control_row = {'Platform': f"{website} (Control)"}
        for i in range(1, 8):
            control_row[str(i)] = control_counts.get(i, 0)
        results.append(control_row)
        
        # Add experimental row
        experimental_row = {'Platform': f"{website} (Experimental)"}
        for i in range(1, 8):
            experimental_row[str(i)] = experimental_counts.get(i, 0)
        results.append(experimental_row)
    
    # Create DataFrame with the correct column order
    columns = ['Platform'] + [str(i) for i in range(1, 8)]
    df = pd.DataFrame(results, columns=columns)
    
    # Create csv directory if it doesn't exist
    csv_dir = os.path.join('datavis', 'csv')
    os.makedirs(csv_dir, exist_ok=True)
    
    # Save to CSV in the csv directory
    output_path = os.path.join(csv_dir, output_file)
    df.to_csv(output_path, index=False)
    print(f"Created {output_path}")
    print("Final DataFrame:")
    print(df)
    return output_path

def create_comprehension_visualization(csv_path, output_path=None):
    """
    Creates a 100% stacked bar chart visualization for comprehension comparison data
    
    Parameters:
    csv_path (str): Path to the input CSV file
    output_path (str, optional): Path for the output PNG file. If None, derives from input filename
    """
    # Read the CSV file
    df = pd.read_csv(csv_path)
    
    # Calculate percentages
    df_pct = df.iloc[:, 1:].div(df.iloc[:, 1:].sum(axis=1), axis=0) * 100

    # Set up the plot with increased height
    fig, ax = plt.subplots(figsize=(12, 10))  # Increased height from 8 to 10
    
    # Define colors for 7-point scale - gradient from red to green
    colors = ['#d7191c',    # 1 - Strongly Disagree
              '#f17c4a',    # 2
              '#fec980',    # 3
              '#ffffbf',    # 4 - Neutral
              '#c4e687',    # 5
              '#79c36a',    # 6
              '#1a9641']    # 7 - Strongly Agree
    
    # Create the stacked bars
    left = np.zeros(len(df))
    for idx, col in enumerate(df.columns[1:]):  # Skip Platform column
        ax.barh(df['Platform'], df_pct[col], left=left, 
                color=colors[idx], label=col)
        left += df_pct[col]
    
    # Customize the plot
    ax.set_xlim(0, 100)
    ax.set_xlabel('Percentage of Responses')
    plt.title('Distribution of Comprehension Ratings by Platform')
    
    # Add gridlines
    ax.grid(axis='x', linestyle='--', alpha=0.7)
    
    # Remove top and right spines
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    
    # Add legend with smaller font size and more space
    ax.legend(bbox_to_anchor=(0, 1.05, 1, 0.2),  # Increased vertical position from 1.02 to 1.05
             loc="lower left", mode="expand", 
             ncol=7, 
             borderaxespad=0,
             fontsize='small',
             title="Comprehension Rating")
    
    # Add percentage labels on the bars
    for i in range(len(df)):
        left = 0
        for j, value in enumerate(df_pct.iloc[i]):
            if value > 0:  # Show all non-zero values
                ax.text(left + value/2, i, f'{value:.1f}%',
                       ha='center', va='center',
                       fontsize='small')
            left += value
    
    # Adjust layout with more top margin
    plt.tight_layout()
    plt.subplots_adjust(top=0.85)  # Added more space at the top
    
    # Create images directory if it doesn't exist
    images_dir = os.path.join('datavis', 'images')
    os.makedirs(images_dir, exist_ok=True)
    
    # If no output path specified, create one in the images directory
    if output_path is None:
        base_name = os.path.splitext(os.path.basename(csv_path))[0]
        output_path = os.path.join(images_dir, f"{base_name}_visualization.png")
    else:
        # If output path is specified, ensure it's in the images directory
        output_path = os.path.join(images_dir, os.path.basename(output_path))
    
    # Save the figure
    plt.savefig(output_path, dpi=300, bbox_inches='tight')
    plt.close()
    
    return output_path

def main():
    # Set up argument parser
    parser = argparse.ArgumentParser(description='Create comprehension comparison visualization')
    parser.add_argument('--generate-csv', action='store_true', 
                      help='Generate new CSV from raw data')
    parser.add_argument('--csv-file', 
                      help='Path to existing CSV file (if not generating new one)')
    parser.add_argument('-o', '--output', help='Path for the output PNG file (optional)')
    
    args = parser.parse_args()
    
    try:
        if args.generate_csv:
            csv_file = create_comprehension_comparison_csv()
        elif args.csv_file:
            csv_file = args.csv_file
        else:
            # Default to generating CSV if no arguments provided
            csv_file = create_comprehension_comparison_csv()
            
        output_file = create_comprehension_visualization(csv_file, args.output)
        print(f"Visualization saved as: {output_file}")
        
    except Exception as e:
        print(f"Error: {str(e)}")
        import traceback
        traceback.print_exc()
        return 1
    
    return 0

if __name__ == "__main__":
    sys.exit(main()) 