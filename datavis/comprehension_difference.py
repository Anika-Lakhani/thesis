import numpy as np

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

def analyze_comprehension_differences():
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
            # Websites 1-10 are control, 11-20 are experimental
            for i in range(10):
                control_scores[i].append(data[p_id][i][1])
            for i in range(10, 20):
                experimental_scores[i].append(data[p_id][i][1])
    
    # Process Batch B
    for p_id in batch_B:
        if p_id in data:
            # Websites 1-10 are experimental, 11-20 are control
            for i in range(10):
                experimental_scores[i].append(data[p_id][i][1])
            for i in range(10, 20):
                control_scores[i].append(data[p_id][i][1])
    
    # Process Batch C
    for p_id in batch_C:
        if p_id in data:
            # Websites 1-10 are experimental, 11-20 are control
            for i in range(10):
                experimental_scores[i].append(data[p_id][i][1])
            for i in range(10, 20):
                control_scores[i].append(data[p_id][i][1])
    
    # Process Batch D
    for p_id in batch_D:
        if p_id in data:
            # Websites 1-10 are control, 11-20 are experimental
            for i in range(10):
                control_scores[i].append(data[p_id][i][1])
            for i in range(10, 20):
                experimental_scores[i].append(data[p_id][i][1])
    
    # Calculate differences for websites where we have both control and experimental data
    differences = []
    for i in range(20):  # Analyze all 20 websites
        if control_scores[i] and experimental_scores[i]:  # Check if we have both scores
            control_mean = np.mean(control_scores[i])
            exp_mean = np.mean(experimental_scores[i])
            control_std = np.std(control_scores[i]) if len(control_scores[i]) > 1 else 0
            exp_std = np.std(experimental_scores[i]) if len(experimental_scores[i]) > 1 else 0
            difference = exp_mean - control_mean
            
            differences.append({
                'website': i + 1,
                'control_mean': control_mean,
                'experimental_mean': exp_mean,
                'difference': difference,
                'control_std': control_std,
                'experimental_std': exp_std,
                'control_n': len(control_scores[i]),
                'experimental_n': len(experimental_scores[i])
            })
    
    # Sort by difference (not absolute difference, to see biggest improvements)
    differences.sort(key=lambda x: x['difference'], reverse=True)
    
    # Print results
    print("\nComprehension Differences Analysis (Experimental - Control)")
    print("-" * 100)
    print(f"{'Website':^8} | {'Control':^20} | {'Experimental':^20} | {'Difference':^12} | {'Effect':<10}")
    print(f"{'':^8} | {'Mean':^6} {'(n)':^4} {'SD':^8} | {'Mean':^6} {'(n)':^4} {'SD':^8} | {'':^12} |")
    print("-" * 100)
    
    positive_count = 0
    for d in differences:
        effect = "Positive" if d['difference'] > 0 else "Negative" if d['difference'] < 0 else "No effect"
        if d['difference'] > 0:
            positive_count += 1
        print(f"{d['website']:^8} | {d['control_mean']:>6.2f} ({d['control_n']:>2d}) ±{d['control_std']:6.2f} | "
              f"{d['experimental_mean']:>6.2f} ({d['experimental_n']:>2d}) ±{d['experimental_std']:6.2f} | "
              f"{d['difference']:>+9.2f}   | {effect:<10}")
    
    print(f"\nSummary:")
    print(f"Total websites analyzed: {len(differences)}")
    print(f"Websites showing improvement: {positive_count} ({(positive_count/len(differences))*100:.1f}%)")
    print(f"Websites showing decrease: {len(differences)-positive_count} ({((len(differences)-positive_count)/len(differences))*100:.1f}%)")

if __name__ == "__main__":
    analyze_comprehension_differences() 