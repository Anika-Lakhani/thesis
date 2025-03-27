import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import os
import sys

# Import websites list from make_csv_comp.py
sys.path.append('.')
from make_csv_comp import websites

# Data structure: [complexity, comprehension]
data = {
    'P1': [[5, 2], [4, 4], [5, 4], [1, 7], [4, 5.5], [7, 2], [7, 1], [5, 2], [7, 1], [7, 1],
           [5, 2], [4, 4], [5, 4], [1, 7], [4, 5.5], [7, 2], [7, 1], [5, 2], [7, 1], [7, 1]],
    'P2': [[3, 4], [3, 5.5], [6, 4], [1, 5.5], [2, 7], [6, 2], [6, 3], [4, 3], [3, 4], [6, 2],
           [3, 4], [3, 5.5], [6, 4], [1, 5.5], [2, 7], [6, 2], [6, 3], [4, 3], [3, 4], [6, 2]],
    'P3': [[2, 6], [7, 7], [7, 7], [7, 7], [2, 5], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1],
           [2, 6], [7, 7], [7, 7], [7, 7], [2, 5], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1]],
    'P4': [[7, 5], [3, 5.5], [3, 1.5], [2, 3.5], [2, 3], [2, 1], [1, 5], [2, 6], [3, 6], [1.5, 6.5],
           [7, 5], [3, 5.5], [3, 1.5], [2, 3.5], [2, 3], [2, 1], [1, 5], [2, 6], [3, 6], [1.5, 6.5]],
    'P5': [[5, 2], [4, 3], [4, 3], [2, 6], [1, 6], [6, 1.5], [3, 2.5], [6, 1], [3, 5], [5, 2],
           [5, 2], [4, 3], [4, 3], [2, 6], [1, 6], [6, 1.5], [3, 2.5], [6, 1], [3, 5], [5, 2]],
    'P6': [[1, 5], [1, 6], [1, 6], [1, 6], [1, 7], [1, 7], [1, 7], [1, 7], [1, 7], [1, 7],
           [1, 5], [1, 6], [1, 6], [1, 6], [1, 7], [1, 7], [1, 7], [1, 7], [1, 7], [1, 7]],
    'P7': [[2, 5.5], [1, 5], [1, 7], [1, 7], [1, 7], [1, 7], [1, 7], [1, 7], [1, 7], [1, 7],
           [2, 5.5], [1, 5], [1, 7], [1, 7], [1, 7], [1, 7], [1, 7], [1, 7], [1, 7], [1, 7]],
    'P8': [[5, 3], [6, 6], [4, 4], [2, 3], [2, 2], [7, 1], [7, 2], [5, 4], [4, 5], [4, 5],
           [5, 3], [6, 6], [4, 4], [2, 3], [2, 2], [7, 1], [7, 2], [5, 4], [4, 5], [4, 5]],
    'P9': [[2, 5], [3, 6], [2, 6], [1, 7], [1, 7], [4.5, 2.5], [2, 6], [2, 6], [4, 3.5], [3, 5],
           [2, 5], [3, 6], [2, 6], [1, 7], [1, 7], [4.5, 2.5], [2, 6], [2, 6], [4, 3.5], [3, 5]],
    'P10': [[6, 5], [6, 3], [6, 4], [3, 6], [2, 3], [6, 2], [7, 4], [6, 2], [3, 5], [6, 3],
            [6, 5], [6, 3], [6, 4], [3, 6], [2, 3], [6, 2], [7, 4], [6, 2], [3, 5], [6, 3]],
    'P11': [[1, 2], [2, 2], [1.5, 3], [1.5, 3], [1.5, 3], [1.5, 3], [1.5, 3], [1.5, 3], [1.5, 3], [1.5, 3],
            [1, 2], [2, 2], [1.5, 3], [1.5, 3], [1.5, 3], [1.5, 3], [1.5, 3], [1.5, 3], [1.5, 3], [1.5, 3]],
    'P12': [[5, 1], [5, 3], [4, 3], [2, 6], [2, 7], [7, 1], [4, 5], [5, 1], [5, 3], [3, 5],
            [5, 1], [5, 3], [4, 3], [2, 6], [2, 7], [7, 1], [4, 5], [5, 1], [5, 3], [3, 5]]
}

def get_top_performers():
    # Define participant batches
    batch_A = ['P1', 'P5', 'P9']  # Batch 1 without -> Batch 2 with
    batch_B = ['P2', 'P6', 'P10']  # Batch 2 without -> Batch 1 with
    batch_C = ['P3', 'P7', 'P11']  # Batch 1 with -> Batch 2 without
    batch_D = ['P4', 'P8', 'P12']  # Batch 2 with -> Batch 1 without
    
    # Initialize arrays for each website's scores
    control_scores = [[] for _ in range(20)]  # 20 websites
    experimental_scores = [[] for _ in range(20)]  # 20 websites
    
    # Process Batch A
    for p_id in batch_A:
        if p_id in data:
            for i in range(10):
                control_scores[i].append(data[p_id][i][0])  # Changed to index 0 for complexity
            for i in range(10, 20):
                experimental_scores[i].append(data[p_id][i][0])  # Changed to index 0 for complexity
    
    # Process Batch B
    for p_id in batch_B:
        if p_id in data:
            for i in range(10):
                experimental_scores[i].append(data[p_id][i][0])  # Changed to index 0 for complexity
            for i in range(10, 20):
                control_scores[i].append(data[p_id][i][0])  # Changed to index 0 for complexity
    
    # Process Batch C
    for p_id in batch_C:
        if p_id in data:
            for i in range(10):
                experimental_scores[i].append(data[p_id][i][0])  # Changed to index 0 for complexity
            for i in range(10, 20):
                control_scores[i].append(data[p_id][i][0])  # Changed to index 0 for complexity
    
    # Process Batch D
    for p_id in batch_D:
        if p_id in data:
            for i in range(10):
                control_scores[i].append(data[p_id][i][0])  # Changed to index 0 for complexity
            for i in range(10, 20):
                experimental_scores[i].append(data[p_id][i][0])  # Changed to index 0 for complexity
    
    # Calculate differences for all websites
    differences = []
    for i in range(20):
        if control_scores[i] and experimental_scores[i]:
            control_mean = np.mean(control_scores[i])
            exp_mean = np.mean(experimental_scores[i])
            difference = control_mean - exp_mean  # Reversed for complexity (lower is better)
            control_std = np.std(control_scores[i]) if len(control_scores[i]) > 1 else 0
            exp_std = np.std(experimental_scores[i]) if len(experimental_scores[i]) > 1 else 0
            
            differences.append({
                'website': i + 1,
                'website_name': websites[i],  # Add website name
                'control_mean': control_mean,
                'experimental_mean': exp_mean,
                'difference': difference,
                'control_std': control_std,
                'experimental_std': exp_std,
                'control_scores': control_scores[i],
                'experimental_scores': experimental_scores[i],
                'control_n': len(control_scores[i]),
                'experimental_n': len(experimental_scores[i])
            })
    
    # Sort by difference
    differences.sort(key=lambda x: x['difference'], reverse=True)
    return differences

def create_bar_chart(top_performers):
    # Create figure and axis
    fig, ax = plt.subplots(figsize=(10, 6))
    
    # Prepare data
    websites = [f"Website {d['website']}" for d in top_performers]
    control_means = [d['control_mean'] for d in top_performers]
    exp_means = [d['experimental_mean'] for d in top_performers]
    
    # Set bar positions
    x = np.arange(len(websites))
    width = 0.35
    
    # Create bars
    rects1 = ax.bar(x - width/2, control_means, width, label='Without Extension', color='#ff9999')
    rects2 = ax.bar(x + width/2, exp_means, width, label='With Extension', color='#66b3ff')
    
    # Customize the plot
    ax.set_ylabel('Complexity Score')
    ax.set_title('5 Positive Performers: Complexity Reduction')
    ax.set_xticks(x)
    ax.set_xticklabels(websites)
    ax.legend()
    
    # Add value labels on the bars
    def autolabel(rects):
        for rect in rects:
            height = rect.get_height()
            ax.annotate(f'{height:.1f}',
                       xy=(rect.get_x() + rect.get_width()/2, height),
                       xytext=(0, 3),
                       textcoords="offset points",
                       ha='center', va='bottom')
    
    autolabel(rects1)
    autolabel(rects2)
    
    # Add improvement percentages above bars
    for i, d in enumerate(top_performers):
        improvement = ((d['control_mean'] - d['experimental_mean']) / d['control_mean']) * 100
        ax.text(i, max(d['control_mean'], d['experimental_mean']) + 0.2,
                f'+{improvement:.1f}%',
                ha='center', va='bottom',
                color='green', fontweight='bold')
    
    # Add grid
    ax.grid(True, axis='y', linestyle='--', alpha=0.7)
    
    # Remove top and right spines
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    
    # Set y-axis limit to accommodate labels
    ax.set_ylim(0, 8)
    
    # Adjust layout
    plt.tight_layout()
    
    # Save the plot
    plt.savefig('datavis/images/top_performers_complexity_bar.png', dpi=300, bbox_inches='tight')
    plt.close()

def create_likert_visualization(top_performers):
    # Create figure and axis
    fig, ax = plt.subplots(figsize=(12, 12))  # Increased height for better spacing
    
    # Prepare data for Likert visualization
    websites = []
    ratings_matrix = np.zeros((len(top_performers) * 2, 7))  # Double the rows for control/experimental
    
    # Count occurrences of each rating (1-7) for each website's control and experimental conditions
    for i, d in enumerate(top_performers):
        website_name = d['website_name']  # Use actual website name
        websites.extend([
            f"{website_name} (Control)",
            f"{website_name} (Extension)"
        ])
        
        # Process control scores
        for score in d['control_scores']:
            ratings_matrix[i*2, int(score-1)] += 1
            
        # Process experimental scores
        for score in d['experimental_scores']:
            ratings_matrix[i*2 + 1, int(score-1)] += 1
    
    # Calculate percentages
    ratings_pct = ratings_matrix / np.sum(ratings_matrix, axis=1, keepdims=True) * 100
    
    # Define colors for 7-point scale - gradient from green to red (reversed for complexity)
    colors = ['#1a9641',    # 1 - Very Simple
              '#79c36a',    # 2
              '#c4e687',    # 3
              '#ffffbf',    # 4 - Medium
              '#fec980',    # 5
              '#f17c4a',    # 6
              '#d7191c']    # 7 - Very Complex
    
    # Create the stacked bars with adjusted spacing
    y_positions = []
    current_pos = 0
    for i in range(len(top_performers)):
        y_positions.extend([current_pos + 1, current_pos])  # Control above Extension
        current_pos += 3  # Add extra space between website pairs
    
    # Create the stacked bars
    left = np.zeros(len(ratings_pct))
    for idx in range(7):
        ax.barh(y_positions, ratings_pct[:, idx], left=left, color=colors[idx], height=0.8)
        left += ratings_pct[:, idx]
    
    # Customize the plot
    ax.set_xlim(0, 100)
    ax.set_xlabel('Percentage of Responses')
    ax.set_title('Distribution of Complexity Scores for Top 5 Positive Performers', pad=20)
    
    # Set y-axis ticks and labels
    ax.set_yticks(y_positions)
    ax.set_yticklabels(websites)
    
    # Add gridlines
    ax.grid(axis='x', linestyle='--', alpha=0.7)
    
    # Remove top and right spines
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    
    # Add legend with more space at top
    legend_labels = ['1 - Very Simple', '2', '3', '4 - Medium', '5', '6', '7 - Very Complex']
    ax.legend(legend_labels, bbox_to_anchor=(0, 1.15, 1, 0.1), 
             loc="lower left", mode="expand", ncol=7, borderaxespad=0)
    
    # Add percentage labels on the bars
    for i, y_pos in enumerate(y_positions):
        left = 0
        for j, value in enumerate(ratings_pct[i]):
            if value > 0:  # Show all non-zero values
                ax.text(left + value/2, y_pos, f'{value:.1f}%',
                       ha='center', va='center', fontsize='small')
            left += value
    
    # Add subtle background colors for pairs
    for i in range(0, len(y_positions), 2):
        y_min = min(y_positions[i], y_positions[i+1]) - 0.5
        y_max = max(y_positions[i], y_positions[i+1]) + 0.5
        ax.axhspan(y_min, y_max, color='gray', alpha=0.05)
    
    # Adjust layout with more top margin
    plt.subplots_adjust(top=0.85)
    
    # Save the plot
    plt.savefig('datavis/images/top_performers_complexity_likert.png', dpi=300, bbox_inches='tight')
    plt.close()

def main():
    # Create images directory if it doesn't exist
    os.makedirs('datavis/images', exist_ok=True)
    
    # Get all websites data
    all_websites = get_top_performers()
    
    # Print results for all websites
    print("\nComplexity Differences Analysis for All Websites (Control - Experimental)")
    print("-" * 100)
    print(f"{'Website':^20} | {'Control':^20} | {'Experimental':^20} | {'Difference':^12} | {'Effect':<10}")
    print(f"{'':^20} | {'Mean':^6} {'(n)':^4} {'SD':^8} | {'Mean':^6} {'(n)':^4} {'SD':^8} | {'':^12} |")
    print("-" * 100)
    
    total_positive = 0
    for d in all_websites:
        effect = "Positive" if d['difference'] > 0 else "Negative" if d['difference'] < 0 else "No effect"
        if d['difference'] > 0:
            total_positive += 1
        print(f"{d['website_name']:^20} | {d['control_mean']:>6.2f} ({d['control_n']:>2d}) ±{d['control_std']:6.2f} | "
              f"{d['experimental_mean']:>6.2f} ({d['experimental_n']:>2d}) ±{d['experimental_std']:6.2f} | "
              f"{d['difference']:>+9.2f}   | {effect:<10}")
    
    print(f"\nOverall Summary:")
    print(f"Total websites analyzed: {len(all_websites)}")
    print(f"Websites showing improvement: {total_positive} ({(total_positive/len(all_websites))*100:.1f}%)")
    print(f"Websites showing decrease: {len(all_websites)-total_positive} ({((len(all_websites)-total_positive)/len(all_websites))*100:.1f}%)")
    
    print(f"\nTop 5 Most Improved Websites:")
    print("-" * 100)
    
    # Get top 5 for visualizations
    top_performers = all_websites[:5]
    for d in top_performers:
        print(f"{d['website_name']:^20} | {d['control_mean']:>6.2f} ({d['control_n']:>2d}) ±{d['control_std']:6.2f} | "
              f"{d['experimental_mean']:>6.2f} ({d['experimental_n']:>2d}) ±{d['experimental_std']:6.2f} | "
              f"{d['difference']:>+9.2f}   | Positive")
    
    # Create visualizations for top 5
    create_bar_chart(top_performers)
    create_likert_visualization(top_performers)
    
    print("\nVisualizations saved in datavis/images/")
    print("1. complexity_performers_bar.png (Top 5 most improved)")
    print("2. complexity_performers_likert.png (Top 5 most improved)")

if __name__ == "__main__":
    main() 