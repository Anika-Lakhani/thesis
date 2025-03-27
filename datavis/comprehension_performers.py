import numpy as np
import matplotlib.pyplot as plt
import os
import sys

# Import data from null_analysis.py
sys.path.append('.')
from datavis.null_analysis import data

def create_top_performers_viz():
    # Data for top performers (website_id, control_mean, control_std, exp_mean, exp_std)
    top_performers = [
        (6, 1.42, 0.61, 2.75, 1.99),  # Google
        (3, 3.33, 1.57, 4.50, 1.50),  # Facebook
        (5, 4.58, 2.01, 5.17, 1.67),  # Amazon
        (7, 3.58, 1.84, 4.17, 2.19),  # Twitter
        (9, 3.92, 1.64, 4.50, 2.14)   # Instagram
    ]

    # Setup the plot
    plt.figure(figsize=(12, 6))
    
    # Parameters
    bar_width = 0.35
    opacity = 0.8
    index = np.arange(len(top_performers))
    
    # Create bars
    control_bars = plt.bar(index - bar_width/2, 
            [x[1] for x in top_performers],
            bar_width,
            alpha=opacity,
            color='#ff9999',
            label='Without Extension')
    
    exp_bars = plt.bar(index + bar_width/2,
            [x[3] for x in top_performers],
            bar_width,
            alpha=opacity,
            color='#66b3ff',
            label='With Extension')
    
    # Customization
    plt.xlabel('Website ID')
    plt.ylabel('Comprehension Score')
    plt.title('5 Positive Performers: Comprehension Improvement with OwlGuard')
    plt.xticks(index, [f'Website {x[0]}' for x in top_performers])
    plt.legend()
    
    # Add value labels on the bars
    def autolabel(rects, means):
        for rect, mean in zip(rects, means):
            height = rect.get_height()
            plt.text(rect.get_x() + rect.get_width()/2., height,
                    f'{mean:.2f}',
                    ha='center', va='bottom')
    
    # Add labels to bars
    autolabel(control_bars, [x[1] for x in top_performers])
    autolabel(exp_bars, [x[3] for x in top_performers])
    
    # Add improvement percentages above bars
    for i, performer in enumerate(top_performers):
        improvement = ((performer[3] - performer[1]) / performer[1]) * 100
        plt.text(i, max(performer[1], performer[3]) + 0.2,
                f'+{improvement:.1f}%',
                ha='center', va='bottom',
                color='green', fontweight='bold')
    
    # Set y-axis limit to accommodate labels
    plt.ylim(0, 8)
    
    # Adjust layout and display
    plt.tight_layout()
    
    # Save the plot
    plt.savefig('datavis/images/top_performers_comprehension_bar.png', dpi=300, bbox_inches='tight')
    plt.close()

def create_likert_visualization():
    # Define participant batches
    batch_A = ['P1', 'P5', 'P9']  # Batch 1 without -> Batch 2 with
    batch_B = ['P2', 'P6', 'P10']  # Batch 2 without -> Batch 1 with
    batch_C = ['P3', 'P7', 'P11']  # Batch 1 with -> Batch 2 without
    batch_D = ['P4', 'P8', 'P12']  # Batch 2 with -> Batch 1 without

    # Get top 5 performers from the bar chart data
    top_performers = [
        (6, "Google"),   # Website IDs for top performers
        (3, "Facebook"),
        (5, "Amazon"),
        (7, "Twitter"),
        (9, "Instagram")
    ]

    # Initialize data collection for each website
    websites = []
    ratings_matrix = np.zeros((len(top_performers) * 2, 7))  # Double the rows for control/experimental

    # Process each website
    for i, (website_id, name) in enumerate(top_performers):
        websites.extend([
            f"{name} (Control)",
            f"{name} (Extension)"
        ])
        
        # Collect control and experimental scores for this website
        control_scores = []
        experimental_scores = []
        
        # Process Batch A
        for p_id in batch_A:
            if website_id <= 10:
                control_scores.append(data[p_id][website_id-1][1])  # Index 1 for comprehension
            else:
                experimental_scores.append(data[p_id][website_id-1][1])
        
        # Process Batch B
        for p_id in batch_B:
            if website_id <= 10:
                experimental_scores.append(data[p_id][website_id-1][1])
            else:
                control_scores.append(data[p_id][website_id-1][1])
        
        # Process Batch C
        for p_id in batch_C:
            if website_id <= 10:
                experimental_scores.append(data[p_id][website_id-1][1])
            else:
                control_scores.append(data[p_id][website_id-1][1])
        
        # Process Batch D
        for p_id in batch_D:
            if website_id <= 10:
                control_scores.append(data[p_id][website_id-1][1])
            else:
                experimental_scores.append(data[p_id][website_id-1][1])
        
        # Count occurrences for control condition
        for score in control_scores:
            # Round the score to nearest integer for binning
            score_int = int(round(score))
            # Ensure score is within 1-7 range
            score_int = max(1, min(7, score_int))
            ratings_matrix[i*2, score_int-1] += 1
            
        # Count occurrences for experimental condition
        for score in experimental_scores:
            # Round the score to nearest integer for binning
            score_int = int(round(score))
            # Ensure score is within 1-7 range
            score_int = max(1, min(7, score_int))
            ratings_matrix[i*2 + 1, score_int-1] += 1

    # Calculate percentages
    ratings_pct = ratings_matrix / np.sum(ratings_matrix, axis=1, keepdims=True) * 100

    # Create figure and axis
    fig, ax = plt.subplots(figsize=(12, 12))

    # Define colors for 7-point scale with more vibrant colors (red to green)
    colors = ['#d7191c',    # 1 - Very Low (Vibrant Red)
              '#f17c4a',    # 2 (Vibrant Orange-Red)
              '#fec980',    # 3 (Vibrant Orange)
              '#ffffbf',    # 4 - Medium (Bright Yellow)
              '#91cf60',    # 5 (Vibrant Light Green)
              '#27a83f',    # 6 (Vibrant Green)
              '#1a9641']    # 7 - Very High (Deep Vibrant Green)

    # Create the stacked bars with adjusted spacing
    y_positions = []
    current_pos = 0
    for i in range(len(top_performers)):
        y_positions.extend([current_pos + 1, current_pos])  # Control above Extension
        current_pos += 3  # Add extra space between website pairs

    # Create the stacked bars with full opacity
    left = np.zeros(len(ratings_pct))
    for idx in range(7):
        ax.barh(y_positions, ratings_pct[:, idx], left=left, color=colors[idx], height=0.8, alpha=1.0)
        left += ratings_pct[:, idx]

    # Customize the plot
    ax.set_xlim(0, 100)
    ax.set_xlabel('Percentage of Responses')
    ax.set_title('Distribution of Comprehension Scores for Top 5 High Performers', pad=15)

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
    plt.savefig('datavis/images/top_performers_comprehension_likert.png', dpi=300, bbox_inches='tight')
    plt.close()

if __name__ == "__main__":
    create_top_performers_viz()
    create_likert_visualization()
    print("Visualizations saved as:")
    print("1. top_performers_comprehension_bar.png")
    print("2. top_performers_comprehension_likert.png") 