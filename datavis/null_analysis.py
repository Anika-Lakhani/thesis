import numpy as np

# Manually entering the data for each participant
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

def calculate_mean(participant_data):
    return np.mean(participant_data, axis=0)

# Custom implementation of independent t-test
def independent_ttest(group1, group2):
    n1, n2 = len(group1), len(group2)
    mean1, mean2 = np.mean(group1), np.mean(group2)
    var1, var2 = np.var(group1, ddof=1), np.var(group2, ddof=1)
    
    # Pooled standard error
    pooled_se = np.sqrt(((n1 - 1) * var1 + (n2 - 1) * var2) / (n1 + n2 - 2))
    
    # T-statistic
    t_stat = (mean1 - mean2) / (pooled_se * np.sqrt(1/n1 + 1/n2))
    
    # Degrees of freedom
    df = n1 + n2 - 2
    
    return t_stat, df

# Calculate Cohen's d effect size
def cohens_d(group1, group2):
    n1, n2 = len(group1), len(group2)
    var1, var2 = np.var(group1, ddof=1), np.var(group2, ddof=1)
    pooled_se = np.sqrt(((n1 - 1) * var1 + (n2 - 1) * var2) / (n1 + n2 - 2))
    return (np.mean(group1) - np.mean(group2)) / pooled_se

# Grouping participants into batches
batch_A = np.array([calculate_mean(data['P1']), calculate_mean(data['P5']), calculate_mean(data['P9'])])
batch_B = np.array([calculate_mean(data['P2']), calculate_mean(data['P6']), calculate_mean(data['P10'])])
batch_C = np.array([calculate_mean(data['P3']), calculate_mean(data['P7']), calculate_mean(data['P11'])])
batch_D = np.array([calculate_mean(data['P4']), calculate_mean(data['P8']), calculate_mean(data['P12'])])

# Hypothesis 1: Impact of website batches
website_batch_1 = np.concatenate([batch_A, batch_C])
website_batch_2 = np.concatenate([batch_B, batch_D])

t_stat_websites, df_websites = independent_ttest(website_batch_1.flatten(), website_batch_2.flatten())
d_batches = cohens_d(website_batch_1.flatten(), website_batch_2.flatten())

# Hypothesis 2: Order effect of using the extension
extension_first = np.concatenate([batch_C, batch_D])
extension_second = np.concatenate([batch_A, batch_B])

t_stat_order, df_order = independent_ttest(extension_first.flatten(), extension_second.flatten())
d_order = cohens_d(extension_first.flatten(), extension_second.flatten())

# Print results
print("Hypothesis 1 - Website Batch Impact:")
print(f"t-statistic: {t_stat_websites:.4f}")
print(f"degrees of freedom: {df_websites}")
print(f"Cohen's d: {d_batches:.4f}")

print("\nHypothesis 2 - Extension Order Effect:")
print(f"t-statistic: {t_stat_order:.4f}")
print(f"degrees of freedom: {df_order}")
print(f"Cohen's d: {d_order:.4f}")

# Additional descriptive statistics
print("\nDescriptive Statistics:")
print("Website Batch 1:")
print(f"Mean: {np.mean(website_batch_1):.4f}")
print(f"Standard Deviation: {np.std(website_batch_1, ddof=1):.4f}")
print("\nWebsite Batch 2:")
print(f"Mean: {np.mean(website_batch_2):.4f}")
print(f"Standard Deviation: {np.std(website_batch_2, ddof=1):.4f}")