import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import argparse
import os

def prepare_likert_data(csv_path):
    """
    Prepares the raw CSV data for Likert scale visualization
    
    Parameters:
    csv_path (str): Path to CSV file containing raw Likert ratings
    """
    # Read the raw data
    df = pd.read_csv(csv_path)
    
    # Create a new dataframe to store the counts for each rating
    platforms = df['Platform']
    ratings_matrix = np.zeros((len(platforms), 7))
    
    # Count occurrences of each rating (1-7) for each platform
    for i, row in df.iterrows():
        for rating in row[['P1', 'P5', 'P9']]:  # Count ratings from each person
            if not np.isnan(rating):  # Skip NaN values
                # Subtract 1 because ratings are 1-7 but indices are 0-6
                ratings_matrix[i, int(rating-1)] += 1
    
    # Create the formatted dataframe
    columns = ['1 - Strongly Disagree',
              '2',
              '3',
              '4 - Neutral',
              '5',
              '6',
              '7 - Strongly Agree']
    
    formatted_df = pd.DataFrame(ratings_matrix, 
                              index=platforms,
                              columns=columns)
    
    return formatted_df

def create_likert_visualization(csv_path, output_path=None):
    """
    Creates a 100% stacked bar chart visualization for 7-point Likert scale data
    
    Parameters:
    csv_path (str): Path to the input CSV file
    output_path (str, optional): Path for the output PNG file. If None, derives from input filename
    """
    # Prepare the data
    df = prepare_likert_data(csv_path)
    
    # Calculate percentages
    df_pct = df.div(df.sum(axis=1), axis=0) * 100

    # Set up the plot
    fig, ax = plt.subplots(figsize=(12, 8))
    
    # Define colors for 7-point scale - gradient from red to green
    colors = ['#d7191c',    # 1 - Strongly Disagree
              '#f17c4a',    # 2
              '#fec980',    # 3
              '#ffffbf',    # 4 - Neutral
              '#c4e687',    # 5
              '#79c36a',    # 6
              '#1a9641']    # 7 - Strongly Agree
    
    # Create the stacked bars
    left = np.zeros(len(df_pct))
    for idx, col in enumerate(df_pct.columns):
        ax.barh(df_pct.index, df_pct[col], left=left, 
                color=colors[idx], label=col)
        left += df_pct[col]
    
    # Customize the plot
    ax.set_xlim(0, 100)
    ax.set_xlabel('Percentage of Responses')
    plt.title('Distribution of Likert Scale Responses by Platform')
    
    # Add gridlines
    ax.grid(axis='x', linestyle='--', alpha=0.7)
    
    # Remove top and right spines
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    
    # Add legend with smaller font size
    ax.legend(bbox_to_anchor=(0, 1.02, 1, 0.2), 
             loc="lower left", mode="expand", 
             ncol=len(df.columns), 
             borderaxespad=0,
             fontsize='small')
    
    # Add percentage labels on the bars
    for i in range(len(df_pct)):
        left = 0
        for j, value in enumerate(df_pct.iloc[i]):
            if value > 0:  # Show all non-zero values since we have few responses
                ax.text(left + value/2, i, f'{value:.1f}%',
                       ha='center', va='center',
                       fontsize='small')
            left += value
    
    # Adjust layout
    plt.tight_layout()
    
    # If no output path specified, create one from input filename
    if output_path is None:
        base_name = os.path.splitext(os.path.basename(csv_path))[0]
        output_path = f"{base_name}_visualization.png"
    
    # Save the figure
    plt.savefig(output_path, dpi=300, bbox_inches='tight')
    plt.close()
    
    return output_path

def main():
    # Set up argument parser
    parser = argparse.ArgumentParser(description='Create Likert scale visualizations from CSV data')
    parser.add_argument('csv_file', help='Path to the input CSV file')
    parser.add_argument('-o', '--output', help='Path for the output PNG file (optional)')
    
    # Parse arguments
    args = parser.parse_args()
    
    try:
        # Create visualization
        output_file = create_likert_visualization(args.csv_file, args.output)
        print(f"Visualization saved as: {output_file}")
    except Exception as e:
        print(f"Error: {str(e)}")
        return 1
    
    return 0

if __name__ == "__main__":
    exit(main())
