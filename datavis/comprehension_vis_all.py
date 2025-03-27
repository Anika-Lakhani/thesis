import numpy as np
import matplotlib.pyplot as plt
import os

# Data from null_analysis.py
data = {
    'P1': [[5, 2], [4, 4], [5, 4], [1, 7], [4, 5.5], [7, 2], [7, 1], [5, 2], [7, 1], [7, 1]],
    'P2': [[3, 4], [3, 5.5], [6, 4], [1, 5.5], [2, 7], [6, 2], [6, 3], [4, 3], [3, 4], [6, 2]],
    'P3': [[2, 6], [7, 7], [7, 7], [7, 7], [2, 5], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1]],
    'P4': [[7, 5], [3, 5.5], [3, 1.5], [2, 3.5], [2, 3], [2, 1], [1, 5], [2, 6], [3, 6], [1.5, 6.5]],
    'P5': [[5, 2], [4, 3], [4, 3], [2, 6], [1, 6], [6, 1.5], [3, 2.5], [6, 1], [3, 5], [5, 2]],
    'P6': [[1, 5], [1, 6], [1, 6], [1, 6], [1, 7], [1, 7], [1, 7], [1, 7], [1, 7], [1, 7]],
    'P7': [[2, 5.5], [1, 5], [1, 7], [1, 7], [1, 7], [1, 7], [1, 7], [1, 7], [1, 7], [1, 7]],
    'P8': [[5, 3], [6, 6], [4, 4], [2, 3], [2, 2], [7, 1], [7, 2], [5, 4], [4, 5], [4, 5]],
    'P9': [[2, 5], [3, 6], [2, 6], [1, 7], [1, 7], [4.5, 2.5], [2, 6], [2, 6], [4, 3.5], [3, 5]],
    'P10': [[6, 5], [6, 3], [6, 4], [3, 6], [2, 3], [6, 2], [7, 4], [6, 2], [3, 5], [6, 3]],
    'P11': [[1, 2], [2, 2], [1.5, 3], [1.5, 3], [1.5, 3], [1.5, 3], [1.5, 3], [1.5, 3], [1.5, 3], [1.5, 3]],
    'P12': [[5, 1], [5, 3], [4, 3], [2, 6], [2, 7], [7, 1], [4, 5], [5, 1], [5, 3], [3, 5]]
}

def create_comprehension_visualization():
    # Set up the plot with a larger figure size
    plt.figure(figsize=(15, 20))  # Made taller to accommodate all 20 websites
    
    # Calculate means for each website across participants
    website_means = []
    website_complexities = []
    
    # Process all 20 websites
    for website_idx in range(10):  # For each pair of entries
        for sub_idx in range(2):  # Process both websites in the pair
            comprehension_scores = []
            complexity_scores = []
            
            # Collect scores from all participants
            for participant in data.values():
                pair = participant[website_idx]
                complexity_scores.append(pair[0])  # Complexity rating
                comprehension_scores.append(pair[1])  # Comprehension rating
            
            website_means.append({
                'mean': np.mean(comprehension_scores),
                'std': np.std(comprehension_scores),
                'complexity_mean': np.mean(complexity_scores)
            })

    # Sort websites by mean comprehension score
    sorted_indices = np.argsort([m['mean'] for m in website_means])
    website_means = [website_means[i] for i in sorted_indices]

    # Create positions for the bars
    y_positions = np.arange(len(website_means))
    bar_width = 0.8

    # Plot bars
    bars = plt.barh(y_positions, [m['mean'] for m in website_means],
                    height=bar_width, 
                    color=[plt.cm.RdYlBu(m['complexity_mean']/7.0) for m in website_means],
                    alpha=0.7)
    
    # Add error bars
    plt.errorbar([m['mean'] for m in website_means], y_positions,
                xerr=[m['std'] for m in website_means],
                fmt='none', color='black', capsize=5)

    # Add value labels and complexity ratings
    for i, means in enumerate(website_means):
        # Add comprehension mean
        plt.text(means['mean'] + 0.1, y_positions[i],
                f'Comprehension: {means["mean"]:.1f}\nComplexity: {means["complexity_mean"]:.1f}',
                va='center')

    # Customize the plot
    plt.xlabel('Comprehension Rating (1-7)', fontsize=12)
    plt.ylabel('Website', fontsize=12)
    plt.title('Website Comprehension Ratings\n(Color indicates complexity: Blue=Low, Red=High)', 
              fontsize=14, pad=20)

    # Add website labels
    website_labels = [f'Website {sorted_indices[i]+1}' for i in range(len(website_means))]
    plt.yticks(y_positions, website_labels)

    # Set x-axis limits
    plt.xlim(0, 8)

    # Add gridlines
    plt.grid(True, alpha=0.3)

    # Adjust layout to prevent label cutoff
    plt.tight_layout()

    # Create the images directory if it doesn't exist
    os.makedirs('datavis/images', exist_ok=True)

    # Save the plot
    plt.savefig('datavis/images/comprehension_comparison_all.png', 
                bbox_inches='tight', dpi=300)
    plt.close()

    print("Visualization saved as 'comprehension_comparison_all.png'")
    
    # Print statistical summary
    print("\nStatistical Summary:")
    print("Website | Comprehension Mean (SD) | Complexity Mean")
    print("-" * 55)
    
    for i, idx in enumerate(sorted_indices):
        means = website_means[i]
        print(f"Web {idx+1:2d} | {means['mean']:6.2f} ({means['std']:4.2f}) | {means['complexity_mean']:6.2f}")

if __name__ == "__main__":
    create_comprehension_visualization() 