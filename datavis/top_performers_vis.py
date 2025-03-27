import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import os

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
    batch_A = ['P1', 'P4', 'P9']  # Batch 1 without -> Batch 2 with
    batch_B = ['P2', 'P5', 'P10']  # Batch 2 without -> Batch 1 with
    batch_C = ['P3', 'P6', 'P11']  # Batch 1 with -> Batch 2 without
    batch_D = ['P4', 'P8', 'P12']  # Batch 2 with -> Batch 1 without
    
    # Initialize arrays for each website's scores
    control_scores = [[] for _ in range(20)]  # 20 websites
    experimental_scores = [[] for _ in range(20)]  # 20 websites
    
    # Process Batch A
    for p_id in batch_A:
        if p_id in data:
            for i in range(10):
                control_scores[i].append(data[p_id][i][1])
            for i in range(10, 20):
                experimental_scores[i].append(data[p_id][i][1])
    
    # Process Batch B
    for p_id in batch_B:
        if p_id in data:
            for i in range(10):
                experimental_scores[i].append(data[p_id][i][1])
            for i in range(10, 20):
                control_scores[i].append(data[p_id][i][1])
    
    # Process Batch C
    for p_id in batch_C:
        if p_id in data:
            for i in range(10):
                experimental_scores[i].append(data[p_id][i][1])
            for i in range(10, 20):
                control_scores[i].append(data[p_id][i][1])
    
    # Process Batch D
    for p_id in batch_D:
        if p_id in data:
            for i in range(10):
                control_scores[i].append(data[p_id][i][1])
            for i in range(10, 20):
                experimental_scores[i].append(data[p_id][i][1])
    
    # Calculate differences and get top performers
    differences = []
    for i in range(20):
        if control_scores[i] and experimental_scores[i]:
            control_mean = np.mean(control_scores[i])
            exp_mean = np.mean(experimental_scores[i])
            difference = exp_mean - control_mean
            
            differences.append({
                'website': i + 1,
                'control_mean': control_mean,
                'experimental_mean': exp_mean,
                'difference': difference,
                'control_scores': control_scores[i],
                'experimental_scores': experimental_scores[i]
            })
    
    # Sort by difference and get top 5 positive performers
    differences.sort(key=lambda x: x['difference'], reverse=True)
    return differences[:5]

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
    ax.set_ylabel('Comprehension Score')
    ax.set_title('Top 5 Positive Performers: Comprehension Scores')
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
    
    # Add grid
    ax.grid(True, axis='y', linestyle='--', alpha=0.7)
    
    # Remove top and right spines
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    
    # Adjust layout
    plt.tight_layout()
    
    # Save the plot
    plt.savefig('datavis/images/top_performers_bar.png', dpi=300, bbox_inches='tight')
    plt.close()

def create_likert_visualization(top_performers):
    # Create figure and axis
    fig, ax = plt.subplots(figsize=(12, 12))  # Increased height further for better spacing
    
    # Prepare data for Likert visualization
    websites = []
    ratings_matrix = np.zeros((len(top_performers) * 2, 7))  # Double the rows for control/experimental
    
    # Website names mapping (you can customize these)
    website_names = {
        5: "Amazon",
        3: "Facebook",
        6: "Google",
        18: "Twitter",
        20: "Instagram"
    }
    
    # Count occurrences of each rating (1-7) for each website's control and experimental conditions
    for i, d in enumerate(top_performers):
        website_num = d['website']
        website_name = website_names.get(website_num, f"Website {website_num}")
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
    
    # Define colors for 7-point scale - gradient from red to green
    colors = ['#d7191c',    # 1 - Very Low
              '#f17c4a',    # 2
              '#fec980',    # 3
              '#ffffbf',    # 4 - Medium
              '#c4e687',    # 5
              '#79c36a',    # 6
              '#1a9641']    # 7 - Very High
    
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
    ax.set_title('Distribution of Comprehension Scores for Top 5 Positive Performers', pad=20)
    
    # Set y-axis ticks and labels
    ax.set_yticks(y_positions)
    ax.set_yticklabels(websites)
    
    # Add gridlines
    ax.grid(axis='x', linestyle='--', alpha=0.7)
    
    # Remove top and right spines
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    
    # Add legend with more space at top
    legend_labels = ['1 - Very Low', '2', '3', '4 - Medium', '5', '6', '7 - Very High']
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
    plt.savefig('datavis/images/top_performers_likert.png', dpi=300, bbox_inches='tight')
    plt.close()

def main():
    # Create images directory if it doesn't exist
    os.makedirs('datavis/images', exist_ok=True)
    
    # Get top performers
    top_performers = get_top_performers()
    
    # Create visualizations
    create_bar_chart(top_performers)
    create_likert_visualization(top_performers)
    
    print("Visualizations saved in datavis/images/")
    print("1. top_performers_bar.png")
    print("2. top_performers_likert.png")

if __name__ == "__main__":
    main() 