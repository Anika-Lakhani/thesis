# Initialize participant groups
groups = {
    'A': ['P1', 'P5', 'P9'],
    'B': ['P2', 'P6', 'P10'],
    'C': ['P3', 'P7', 'P11'],
    'D': ['P4', 'P8', 'P12']
}

participants = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9', 'P10', 'P11', 'P12']
websites = ['Google', 'Reddit', 'Amazon', 'DuckDuckGo', 'Wikipedia', 'NYT', 'Canva', 'LinkedIn', 'Pinterest', 'Gemini', 'YouTube', 'Meta', 'Microsoft', 'Yahoo', 'Instagram', 'Canvas', 'ChatGPT', 'Crimson', 'Perplexity', 'Twitter']

# Initialize extension usage for each group
extension_usage = {
    'A': websites[10:],  # Second half
    'B': websites[:10],  # First half
    'C': websites[:10],  # First half
    'D': websites[10:]   # Second half
}

# Store complicatedness and comprehension ratings
ratings = {
    'P1': [[5, 2], [4, 4], [5, 4], [1, 7], [4, 5.5], [7, 2], [7, 1], [5, 2], [7, 1], [7, 1], [1, 7], [1, 7], [1, 7], [1, 7], [1, 4], [1, 4], [1, 4], [1, 4], [1, 4], [4, 2]],
    'P2': [[3, 4], [3, 5.5], [6, 4], [1, 5.5], [2, 7], [6, 2], [6, 3], [4, 3], [3, 4], [6, 2], [1, 1.5], [5, 4], [6, 3], [3, 5.5], [3, 5], [1.5, 6], [2.5, 5.5], [4, 5.5], [6, 3], [5, 3]],
    'P3': [[2, 6], [7, 7], [7, 7], [7, 7], [2, 5], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [5, 2], [6, 1], [6, 1], [6, 1], [6, 1], [3, 4], [6, 1], [2, 4], [6, 1], [6, 1]],
    'P4': [[7, 5], [3, 5.5], [3, 1.5], [2, 3.5], [2, 3], [2, 1], [1, 5], [2, 6], [3, 6], [1.5, 6.5], [3, 2.5], [5, 3], [2, 5], [2.5, 5], [2, 4.5], [1, 1], [3, 5], [1, 7], [6, 2.5], [4, 2.5]],
    'P5': [[5, 2], [4, 3], [4, 3], [2, 6], [1, 6], [6, 1.5], [3, 2.5], [6, 1], [3, 5], [5, 2], [4.5, 3], [6, 3], [3, 3], [4.5, 4], [5.5, 4], [2, 6], [4, 5], [2, 5], [6, 4], [3, 4]],
    'P6': [[1, 5], [1, 6], [1, 6], [1, 6], [1, 7], [1, 7], [1, 7], [1, 7], [1, 7], [1, 7], [3.5, 1], [4, 1], [6, 1], [5.5, 1], [6, 1], [2, 1], [6, 1], [2, 1], [5, 1], [7, 1]],
    'P7': [[2, 5.5], [1, 5], [1, 7], [1, 7], [1, 7], [1, 7], [1, 7], [1, 7], [1, 7], [1, 7], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1]],
    'P8': [[5, 3], [6, 6], [4, 4], [2, 3], [2, 2], [7, 1], [7, 2], [5, 4], [4, 5], [4, 5], [1, 2], [5, 3], [3, 6], [3, 5], [4, 5], [2, 6], [4, 5], [3, 5], [6, 5], [2, 5]],
    'P9': [[2, 5], [3, 6], [2, 6], [1, 7], [1, 7], [4.5, 2.5], [2, 6], [2, 6], [4, 3.5], [3, 5], [7, 1], [3, 4], [3, 4], [3, 5], [3, 5], [2, 5.5], [5, 3], [2, 6], [4, 3], [2, 5.5]],
    'P10': [[6, 5], [6, 3], [6, 4], [3, 6], [2, 3], [6, 2], [7, 4], [6, 2], [3, 5], [6, 3], [1, 5], [6, 2], [5, 4], [6, 3], [5, 5], [4, 2], [6, 2], [3, 4], [7, 2], [7, 2]],
    'P11': [[1, 2], [2, 2], [1.5, 3], [1.5, 3], [1.5, 3], [1.5, 3], [1.5, 3], [1.5, 3], [1.5, 3], [1.5, 3], [2, 1], [7, 1], [5.5, 1], [5.5, 1], [5.5, 1], [5.5, 1], [5, 1], [5, 1], [5, 1], [5, 1]],
    'P12': [[5, 1], [5, 3], [4, 3], [2, 6], [2, 7], [7, 1], [4, 5], [5, 1], [5, 3], [3, 5], [6, 5], [7, 4], [4, 4], [3, 4], [6, 2], [3, 5], [3, 4], [2, 6], [6, 3], [3, 3]]
}

import pandas as pd
import numpy as np

def create_comprehension_comparison_csv():
    # Websites to analyze
    target_websites = ['Google', 'Reddit', 'Amazon', 'DuckDuckGo', 'Wikipedia']
    
    # Groups using extension for first half (these are experimental for target websites)
    experimental_groups = ['B', 'C']
    # Groups using extension for second half (these are control for target websites)
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
    
    # Save to CSV
    output_file = 'comprehension_comparison.csv'
    df.to_csv(output_file, index=False)
    print(f"Created {output_file}")
    print("\nDataFrame contents:")
    print(df)
    return output_file

if __name__ == "__main__":
    create_comprehension_comparison_csv()

'''on @make_csv_comp.py , i have given you a list of ratings [x, y] for each participant.

Basically, the study setup is as follows:
- There are 12 participants
- there are an even number of participants in each participant group, as dictated by groups{}
- each participant examined 20 websites as listed in websites[]
- certain participants used the first half of hte websites as their control condition, and other partiicpants used the second half of the websites as their control condition. This is dictated by extension_usage{}

Within each [x, y] entry, the x value is how that participant rated the complexity of the website. Say that we are looking at hte first entry of ratings(P1), which is [5, 2]. This corresponds with ratings for the first entry in websites[], meaning that P1, who is a part of group A, rated Google a complexity score of 5.
Similarly, the y value in the [x, y] entry is how that participant rated the comrehensibility of the website. So P1 rated Google's comprehensibility as a 2.'''