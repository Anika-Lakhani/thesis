import pandas as pd
import numpy as np
from scipy import stats
import os
import sys

def load_ratings_data():
    """
    Loads the ratings data from make_csv_comp.py
    Returns websites and ratings data
    """
    sys.path.append('.')
    try:
        from make_csv_comp import websites, ratings
        return websites, ratings
    except ImportError as e:
        print(f"Error importing data: {e}")
        print("Make sure make_csv_comp.py is in the same directory")
        sys.exit(1)

def calculate_effect_sizes():
    """
    Calculates effect sizes and statistical significance for comprehension differences
    between experimental and control conditions for each website.
    """
    websites, ratings = load_ratings_data()
    
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
    
    results = []
    
    # Process each website
    for website in websites:
        website_index = websites.index(website)
        
        # Get comprehension ratings
        control_ratings = [ratings[p][website_index][1] for p in control_participants]
        experimental_ratings = [ratings[p][website_index][1] for p in experimental_participants]
        
        # Calculate statistics
        control_mean = np.mean(control_ratings)
        experimental_mean = np.mean(experimental_ratings)
        mean_diff = experimental_mean - control_mean
        
        # Calculate Cohen's d effect size
        pooled_std = np.sqrt((np.var(control_ratings, ddof=1) + np.var(experimental_ratings, ddof=1)) / 2)
        cohens_d = mean_diff / pooled_std if pooled_std != 0 else 0
        
        # Perform t-test
        t_stat, p_value = stats.ttest_ind(experimental_ratings, control_ratings)
        
        # Calculate percentage of high ratings (5-7) for each condition
        control_high = sum(1 for r in control_ratings if r >= 5) / len(control_ratings) * 100
        exp_high = sum(1 for r in experimental_ratings if r >= 5) / len(experimental_ratings) * 100
        high_rating_diff = exp_high - control_high
        
        results.append({
            'Website': website,
            'Control Mean': control_mean,
            'Experimental Mean': experimental_mean,
            'Mean Difference': mean_diff,
            'Cohens_d': cohens_d,
            'p-value': p_value,
            'Control High Ratings %': control_high,
            'Experimental High Ratings %': exp_high,
            'High Rating Difference %': high_rating_diff,
            'Control Ratings': control_ratings,
            'Experimental Ratings': experimental_ratings
        })
    
    # Convert to DataFrame and sort by effect size magnitude
    df = pd.DataFrame(results)
    df = df.sort_values(by=['Cohens_d'], key=abs, ascending=False)
    
    # Print detailed analysis
    print("\nComprehension Rating Analysis by Website:")
    print("=========================================")
    
    for _, row in df.iterrows():
        print(f"\nWebsite: {row['Website']}")
        print(f"Mean Ratings: Control = {row['Control Mean']:.2f}, Experimental = {row['Experimental Mean']:.2f}")
        print(f"Mean Difference (Exp - Control): {row['Mean Difference']:.2f}")
        print(f"Cohen's d: {row['Cohens_d']:.2f}")
        print(f"p-value: {row['p-value']:.3f}")
        print(f"High Ratings (5-7): Control = {row['Control High Ratings %']:.1f}%, Experimental = {row['Experimental High Ratings %']:.1f}%")
        print(f"High Rating Difference: {row['High Rating Difference %']:.1f}%")
        print(f"Raw Control Ratings: {row['Control Ratings']}")
        print(f"Raw Experimental Ratings: {row['Experimental Ratings']}")
        
        # Interpret effect size
        d = abs(row['Cohens_d'])
        if d < 0.2:
            effect = "negligible"
        elif d < 0.5:
            effect = "small"
        elif d < 0.8:
            effect = "medium"
        else:
            effect = "large"
        
        print(f"Effect Size Interpretation: {effect}")
        
        # Recommendation
        if (row['Cohens_d'] > 0 and row['High Rating Difference %'] > 0):
            print("✓ Recommended for visualization (shows positive experimental effect)")
        else:
            print("✗ Not recommended for visualization (no clear positive experimental effect)")
    
    return df

if __name__ == "__main__":
    df = calculate_effect_sizes()
    
    # Save results to CSV
    csv_dir = os.path.join('datavis', 'csv')
    os.makedirs(csv_dir, exist_ok=True)
    output_path = os.path.join(csv_dir, 'comprehension_analysis.csv')
    
    # Save only the numeric columns
    numeric_cols = ['Website', 'Control Mean', 'Experimental Mean', 'Mean Difference', 
                   'Cohens_d', 'p-value', 'Control High Ratings %', 
                   'Experimental High Ratings %', 'High Rating Difference %']
    df[numeric_cols].to_csv(output_path, index=False)
    print(f"\nAnalysis saved to: {output_path}") 