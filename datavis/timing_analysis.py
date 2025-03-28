import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime
import seaborn as sns
import sys

# Import websites list from make_csv_comp.py
sys.path.append('.')
from make_csv_comp import websites

# Data for timings
timings = {
    'P1': [
        '0:56:43', '0:16:55', '0:49:00', '0:37:01', '0:17:03',
        '1:13:12', '0:55:27', '0:45:35', '0:31:11', '0:32:39',
        '0:52:33', '0:16:42', '0:28:26', '0:11:11', '0:26:54',
        '0:14:33', '0:13:30', '0:20:13', '0:12:53', '0:42:56'
    ],
    'P2': [
        '1:26:56', '1:21:48', '2:05:35', '0:44:04', '0:54:31',
        '2:21:03', '1:30:04', '1:24:38', '1:13:25', '1:21:37',
        '1:11:14', '1:21:24', '1:20:29', '1:20:28', '1:53:56',
        '1:21:14', '2:46:48', '1:41:01', '1:46:13', '1:41:53'
    ],
    'P3': [
        '5:02:10', '0:21:24', '0:29:09', '0:42:57', '0:31:11',
        '0:21:25', '0:22:41', '0:16:12', '0:16:39', '0:18:51',
        '1:18:23', '0:11:08', '0:08:18', '0:07:51', '0:27:33',
        '0:52:57', '0:15:38', '0:34:27', '0:10:10', '0:05:07'
    ],
    'P4': [
        '1:03:11', '0:53:26', '0:44:34', '0:33:31', '0:54:23',
        '0:53:40', '0:44:27', '1:02:05', '0:50:32', '1:01:27',
        '1:04:02', '1:13:35', '0:44:54', '1:28:34', '1:09:36',
        '1:05:26', '0:57:23', '0:46:29', '1:17:15', '0:47:52'
    ],
    'P5': [
        '0:41:20', '1:08:53', '0:13:20', '1:01:12', '0:37:54',
        '0:58:32', '1:01:38', '0:53:59', '0:37:42', '0:51:28',
        '1:05:04', '0:58:10', '0:51:53', '0:43:53', '0:54:25',
        '0:39:20', '0:51:12', '0:32:42', '0:33:05', '0:42:00'
    ],
    'P6': [
        '1:05:18', '0:28:06', '0:23:21', '0:22:16', '0:29:52',
        '0:27:03', '0:23:09', '0:09:34', '0:15:09', '0:09:27',
        '0:02:46', '0:05:30', '0:06:02', '0:05:12', '0:08:27',
        '0:10:36', '0:08:20', '0:07:25', '0:10:44', '0:05:38'
    ],
    'P7': [
        '4:32:06', '1:19:39', '0:54:58', '0:38:27', '0:29:37',
        '0:28:28', '0:24:38', '0:23:15', '0:49:33', '0:22:27',
        '0:04:23', '0:02:21', '0:08:07', '0:05:04', '0:05:19',
        '0:10:14', '0:07:44', '0:14:07', '0:07:07', '0:11:49'
    ],
    'P8': [
        '0:42:52', '0:51:36', '0:59:54', '0:33:31', '0:26:45',
        '0:18:11', '0:17:29', '0:21:46', '0:31:26', '0:26:17',
        '0:31:24', '0:52:37', '0:58:30', '0:36:53', '0:31:57',
        '0:39:57', '1:01:00', '0:34:28', '0:44:13', '0:47:02'
    ],
    'P9': [
        '2:34:09', '0:15:14', '1:06:17', '0:41:04', '0:27:05',
        '0:24:59', '2:47:35', '1:50:30', '0:35:24', '0:39:28',
        '0:27:27', '0:52:03', '0:45:07', '0:41:03', '0:58:28',
        '0:42:30', '1:03:46', '0:20:43', '0:44:48', '0:54:50'
    ],
    'P10': [
        '0:55:54', '0:49:35', '0:48:39', '1:38:09', '1:05:12',
        '0:51:43', '0:35:58', '0:59:51', '0:42:01', '0:40:28',
        '0:24:57', '0:30:47', '0:25:34', '0:25:56', '0:29:43',
        '0:21:24', '0:23:15', '0:30:31', '0:30:47', '0:24:45'
    ],
    'P11': [
        '0:26:55', '0:20:26', '0:21:31', '0:17:35', '0:23:28',
        '0:12:34', '0:21:00', '0:15:42', '0:12:05', '0:10:56',
        '0:02:27', '0:02:15', '0:07:54', '0:00:54', '0:01:16',
        '0:04:32', '0:06:07', '0:06:58', '0:04:01', '0:03:59'
    ],
    'P12': [
        '0:19:20', '0:20:11', '0:28:25', '0:13:11', '0:35:15',
        '0:11:03', '0:30:03', '0:16:00', '0:31:25', '0:33:22',
        '0:26:47', '1:06:09', '1:18:05', '1:13:37', '2:00:42',
        '1:32:00', '1:20:36', '1:05:10', '0:45:13', '0:47:52'
    ],
}

def time_to_seconds(time_str):
    """Convert time string (M:SS:ss) to seconds."""
    try:
        minutes, seconds, ms = map(int, time_str.split(':'))
        return minutes * 60 + seconds + ms/100
    except:
        print(f"Error converting time: {time_str}")
        return 0

def format_seconds(seconds):
    """Format seconds into MM:SS format for display."""
    minutes = int(seconds // 60)
    remaining_seconds = seconds % 60
    return f"{minutes}:{remaining_seconds:05.2f}"

def erf(x):
    """
    Approximation of the error function.
    Uses Abramowitz and Stegun approximation 7.1.26.
    """
    # Constants for approximation
    a = [0.254829592, -0.284496736, 1.421413741, -1.453152027, 1.061405429]
    p = 0.3275911
    
    # Save the sign of x
    sign = 1
    if x < 0:
        sign = -1
    x = abs(x)
    
    # Formula 7.1.26
    t = 1.0 / (1.0 + p * x)
    y = 1.0
    
    for coef in a:
        y = y - coef * t ** (len(a) - a.index(coef))
    
    return sign * (1 - y * np.exp(-x * x))

def norm_cdf(x):
    """
    Approximate normal cumulative distribution function.
    Uses error function approximation.
    """
    return 0.5 * (1 + erf(x / np.sqrt(2)))

def t_distribution_p_value(t_stat, df):
    """
    Calculate p-value using t-distribution approximation.
    Uses a polynomial approximation for the cumulative t-distribution.
    """
    x = abs(t_stat)
    
    # For large df, use normal approximation
    if df > 30:
        p = 2 * (1 - norm_cdf(x))
    else:
        # For small df, use t-distribution approximation
        # Based on simplified approximation
        p = 2 * (1 - norm_cdf(x * np.sqrt((df - 2) / df)))
    
    # Ensure p-value is between 0 and 1
    return min(max(p, 0), 1)

def calculate_paired_ttest(group1, group2):
    """
    Calculate paired t-test statistics.
    Returns t-statistic and p-value.
    """
    if len(group1) != len(group2):
        raise ValueError("Groups must be of equal size for paired t-test")
    
    # Calculate differences
    differences = np.array(group1) - np.array(group2)
    n = len(differences)
    
    # Calculate mean and standard error of differences
    mean_diff = np.mean(differences)
    std_diff = np.std(differences, ddof=1)
    se_diff = std_diff / np.sqrt(n)
    
    # Calculate t-statistic
    t_stat = mean_diff / se_diff
    
    # Calculate degrees of freedom
    df = n - 1
    
    # Calculate p-value using our t-distribution approximation
    p_value = t_distribution_p_value(t_stat, df)
    
    return t_stat, p_value

def calculate_independent_ttest(group1, group2):
    """
    Calculate independent t-test statistics.
    Returns t-statistic and p-value.
    """
    n1, n2 = len(group1), len(group2)
    mean1, mean2 = np.mean(group1), np.mean(group2)
    var1, var2 = np.var(group1, ddof=1), np.var(group2, ddof=1)
    
    # Pooled standard error
    pooled_se = np.sqrt(((n1 - 1) * var1 + (n2 - 1) * var2) / (n1 + n2 - 2))
    
    # T-statistic
    t_stat = (mean1 - mean2) / (pooled_se * np.sqrt(1/n1 + 1/n2))
    
    # Degrees of freedom
    df = n1 + n2 - 2
    
    # Calculate p-value using our t-distribution approximation
    p_value = t_distribution_p_value(t_stat, df)
    
    return t_stat, p_value

def analyze_timings():
    # Define participant batches
    batch_A = ['P1', 'P5', 'P9']  # Batch 1 without -> Batch 2 with
    batch_B = ['P2', 'P6', 'P10']  # Batch 2 without -> Batch 1 with
    batch_C = ['P3', 'P7', 'P11']  # Batch 1 with -> Batch 2 without
    batch_D = ['P4', 'P8', 'P12']  # Batch 2 with -> Batch 1 without
    
    # Convert all times to seconds
    timing_seconds = {p: [time_to_seconds(t) for t in times] for p, times in timings.items()}
    
    # Initialize lists for control and experimental times
    control_times = []
    experimental_times = []
    
    # Initialize per-website data
    website_data = []
    
    # Process each website (0-19)
    for website_id in range(20):
        website_control = []
        website_experimental = []
        
        # Get control times
        for batch in [batch_A, batch_B] if website_id < 10 else [batch_C, batch_D]:
            for p_id in batch:
                time = timing_seconds[p_id][website_id]
                control_times.append(time)
                website_control.append(time)
        
        # Get experimental times
        for batch in [batch_C, batch_D] if website_id < 10 else [batch_A, batch_B]:
            for p_id in batch:
                time = timing_seconds[p_id][website_id]
                experimental_times.append(time)
                website_experimental.append(time)
        
        # Calculate website statistics
        control_mean = np.mean(website_control)
        exp_mean = np.mean(website_experimental)
        time_diff = control_mean - exp_mean
        percent_change = (time_diff / control_mean) * 100
        
        # Calculate t-test for this website
        t_stat, p_value = calculate_paired_ttest(website_control, website_experimental)
        
        website_data.append({
            'website_id': website_id + 1,
            'control_mean': control_mean,
            'control_std': np.std(website_control),
            'exp_mean': exp_mean,
            'exp_std': np.std(website_experimental),
            'diff': time_diff,
            'percent_change': percent_change,
            'p_value': p_value,
            't_stat': t_stat
        })
    
    # Overall statistics
    control_mean = np.mean(control_times)
    control_std = np.std(control_times)
    exp_mean = np.mean(experimental_times)
    exp_std = np.std(experimental_times)
    
    # Overall statistical test
    t_stat, p_value = calculate_paired_ttest(control_times, experimental_times)
    
    # Print summary statistics
    print("\nOverall Timing Analysis Summary")
    print("-" * 70)
    print(f"Control Condition:")
    print(f"  Mean time: {format_seconds(control_mean)} (mm:ss.ms)")
    print(f"  Std dev:  {format_seconds(control_std)} (mm:ss.ms)")
    print(f"\nExperimental Condition:")
    print(f"  Mean time: {format_seconds(exp_mean)} (mm:ss.ms)")
    print(f"  Std dev:  {format_seconds(exp_std)} (mm:ss.ms)")
    
    # Calculate overall time difference
    time_diff = control_mean - exp_mean
    percent_change = (time_diff / control_mean) * 100
    print(f"\nTime Difference:")
    print(f"  Absolute: {format_seconds(abs(time_diff))} (mm:ss.ms)")
    print(f"  Relative: {percent_change:.1f}% {'reduction' if time_diff > 0 else 'increase'}")
    print(f"  Statistical significance: p = {p_value:.4f}")
    
    # Print per-website analysis
    print("\nPer-Website Analysis")
    print("-" * 100)
    print(f"{'Website':^8} | {'Control Time':^15} | {'Experimental Time':^15} | {'Difference':^15} | {'Change':^8} | {'p-value':^8}")
    print("-" * 100)
    
    # Sort websites by absolute percent change
    website_data.sort(key=lambda x: abs(x['percent_change']), reverse=True)
    
    for site in website_data:
        print(f"{site['website_id']:^8} | "
              f"{format_seconds(site['control_mean']):^15} | "
              f"{format_seconds(site['exp_mean']):^15} | "
              f"{format_seconds(abs(site['diff'])):^15} | "
              f"{site['percent_change']:>+7.1f}% | "
              f"{site['p_value']:.4f}")
    
    # Create visualizations
    create_timing_visualizations(control_times, experimental_times, website_data)
    create_cs_vs_noncs_visualization(timing_seconds)
    create_cs_vs_noncs_per_website(timing_seconds)
    create_cs_vs_noncs_split_conditions(timing_seconds)
    
    # Add call to new analysis function
    analyze_within_group_differences(timing_seconds)

def create_timing_visualizations(control_times, experimental_times, website_data):
    # Website names are now imported from make_csv_comp.py
    # Create dictionary mapping website_id to name (1-based indexing)
    website_names = {i+1: name for i, name in enumerate(websites)}

    # 1. Box plot with points
    plt.figure(figsize=(10, 6))
    data = [control_times, experimental_times]
    bp = plt.boxplot(data, labels=['Without Extension', 'With Extension'])
    
    # Add individual points with jitter
    for i, d in enumerate(data, 1):
        x = np.random.normal(i, 0.04, size=len(d))
        plt.plot(x, d, 'o', alpha=0.5, color='#666666', markersize=4)
    
    plt.ylabel('Time (seconds)')
    plt.title('Distribution of Task Completion Times')
    plt.tight_layout()
    plt.savefig('datavis/images/timing_boxplot.png', dpi=300, bbox_inches='tight')
    plt.close()
    
    # 2. Violin plot
    plt.figure(figsize=(10, 6))
    sns.violinplot(data=data)
    plt.xticks([0, 1], ['Without Extension', 'With Extension'])
    plt.ylabel('Time (seconds)')
    plt.title('Density Distribution of Task Completion Times')
    plt.tight_layout()
    plt.savefig('datavis/images/timing_violin.png', dpi=300, bbox_inches='tight')
    plt.close()
    
    # 3. Per-website comparison
    plt.figure(figsize=(15, 8))
    
    # Sort websites by control time for better visualization
    website_data.sort(key=lambda x: x['control_mean'])
    
    x = np.arange(len(website_data))
    width = 0.35
    
    # Create bars
    control_bars = plt.bar(x - width/2, [w['control_mean'] for w in website_data], width, 
                          label='Without Extension', color='#ff9999')
    exp_bars = plt.bar(x + width/2, [w['exp_mean'] for w in website_data], width,
                       label='With Extension', color='#66b3ff')
    
    # Customize the plot
    plt.ylabel('Time (seconds)')
    plt.title('Per-Website Completion Times')
    plt.xticks(x, [website_names[w['website_id']] for w in website_data], 
               rotation=45, ha='right')
    plt.legend()
    
    # Add percentage change labels with color coding
    for i, site in enumerate(website_data):
        if site['p_value'] < 0.05:  # Add asterisk for significant differences
            label = f"{site['percent_change']:+.1f}%*"
        else:
            label = f"{site['percent_change']:+.1f}%"
        
        y = max(site['control_mean'], site['exp_mean'])
        # Purple for time increases, orange for decreases
        color = '#800080' if site['percent_change'] < 0 else '#FFA500'
        plt.text(i, y + 1, label, ha='center', va='bottom', rotation=45, color=color)
    
    # Adjust layout and save
    plt.tight_layout()
    plt.savefig('datavis/images/timing_bars.png', dpi=300, bbox_inches='tight')
    plt.close()

def create_cs_vs_noncs_visualization(timing_seconds):
    """Create a bar chart comparing CS vs Non-CS group timings."""
    # Define groups
    cs_group = ['P1', 'P2', 'P4', 'P5', 'P10']
    noncs_group = ['P3', 'P6', 'P7', 'P8', 'P9', 'P11', 'P12']
    
    # Collect all times for each group
    cs_times = []
    noncs_times = []
    
    # Process each participant's times
    for p_id, times in timing_seconds.items():
        if p_id in cs_group:
            cs_times.extend(times)
        elif p_id in noncs_group:
            noncs_times.extend(times)
    
    # Calculate statistics
    cs_mean = np.mean(cs_times)
    cs_std = np.std(cs_times)
    noncs_mean = np.mean(noncs_times)
    noncs_std = np.std(noncs_times)
    
    # Calculate t-test
    t_stat, p_value = calculate_independent_ttest(cs_times, noncs_times)
    
    # Create bar chart
    plt.figure(figsize=(10, 6))
    x = np.arange(2)
    width = 0.35
    
    # Create bars
    plt.bar(x, [cs_mean, noncs_mean], width, 
            yerr=[cs_std, noncs_std], capsize=5,
            color=['#ff9999', '#66b3ff'])
    
    # Customize the plot
    plt.ylabel('Time (seconds)')
    plt.title('Task Completion Times: CS vs Non-CS Participants')
    plt.xticks(x, ['CS Group\n(n=5)', 'Non-CS Group\n(n=7)'])
    
    # Add mean values above the error bars
    for i, (v, std) in enumerate(zip([cs_mean, noncs_mean], [cs_std, noncs_std])):
        # Position text above the error bars
        text_y = v + std + 2  # Add 2 seconds padding
        plt.text(i, text_y, f'{v:.1f}s', ha='center', va='bottom', fontweight='bold')
    
    # Get current axis limits
    ymin, ymax = plt.ylim()
    
    # Add significance annotation centered vertically
    if p_value < 0.05:
        plt.text(0.5, ymax * 0.85, f'p = {p_value:.5f}*', 
                ha='center', va='center', fontweight='bold')
    else:
        plt.text(0.5, ymax * 0.85, f'p = {p_value:.5f}', 
                ha='center', va='center', fontweight='bold')
    
    # Ensure there's enough room at the top for all text
    plt.ylim(ymin, ymax * 1.1)
    
    # Adjust layout and save
    plt.tight_layout()
    plt.savefig('datavis/images/cs_vs_noncs_timing.png', dpi=300, bbox_inches='tight')
    plt.close()
    
    # Print statistics
    print("\nCS vs Non-CS Group Analysis")
    print("-" * 70)
    print(f"CS Group (n=5):")
    print(f"  Mean time: {format_seconds(cs_mean)} (mm:ss.ms)")
    print(f"  Std dev:  {format_seconds(cs_std)} (mm:ss.ms)")
    print(f"\nNon-CS Group (n=7):")
    print(f"  Mean time: {format_seconds(noncs_mean)} (mm:ss.ms)")
    print(f"  Std dev:  {format_seconds(noncs_std)} (mm:ss.ms)")
    print(f"\nStatistical Test:")
    print(f"  t-statistic: {t_stat:.4f}")
    print(f"  p-value: {p_value:.4f}")
    return cs_mean, cs_std, noncs_mean, noncs_std, t_stat, p_value

def create_cs_vs_noncs_per_website(timing_seconds):
    """Create a bar chart comparing CS vs Non-CS group timings per website."""
    # Define groups
    cs_group = ['P1', 'P2', 'P4', 'P5', 'P10']
    noncs_group = ['P3', 'P6', 'P7', 'P8', 'P9', 'P11', 'P12']
    
    # Website names from make_csv_comp.py
    website_names = {i+1: name for i, name in enumerate(websites)}
    
    # Initialize data structures
    website_stats = []
    
    # Process each website
    for website_id in range(1, 21):
        idx = website_id - 1
        cs_times = []
        noncs_times = []
        
        # Collect times for each group
        for p_id in cs_group:
            cs_times.append(timing_seconds[p_id][idx])
        for p_id in noncs_group:
            noncs_times.append(timing_seconds[p_id][idx])
        
        # Calculate statistics
        cs_mean = np.mean(cs_times)
        noncs_mean = np.mean(noncs_times)
        diff = ((cs_mean - noncs_mean) / noncs_mean) * 100 if noncs_mean != 0 else 0
        t_stat, p_value = calculate_independent_ttest(cs_times, noncs_times)
        
        website_stats.append({
            'website_id': website_id,
            'cs_mean': cs_mean,
            'noncs_mean': noncs_mean,
            'percent_diff': diff,
            'p_value': p_value
        })
    
    # Sort websites by absolute percent difference
    website_stats.sort(key=lambda x: abs(x['percent_diff']), reverse=True)
    
    # Create the visualization
    plt.figure(figsize=(15, 8))
    x = np.arange(len(website_stats))
    width = 0.35
    
    # Create bars
    cs_bars = plt.bar(x - width/2, [w['cs_mean'] for w in website_stats], width,
                      label='CS Group', color='#ff9999')
    noncs_bars = plt.bar(x + width/2, [w['noncs_mean'] for w in website_stats], width,
                         label='Non-CS Group', color='#66b3ff')
    
    # Customize the plot
    plt.ylabel('Time (seconds)')
    plt.title('Per-Website Completion Times: CS vs Non-CS Groups')
    plt.xticks(x, [website_names[w['website_id']] for w in website_stats],
               rotation=45, ha='right')
    plt.legend()
    
    # Get current y-axis limits
    ymin, ymax = plt.ylim()
    
    # Add percentage difference labels and significant p-values
    for i, site in enumerate(website_stats):
        # Calculate y position for percentage difference label
        y = max(site['cs_mean'], site['noncs_mean'])
        
        # Add percentage difference label
        if site['p_value'] < 0.05:
            label = f"{site['percent_diff']:+.1f}%*"
        else:
            label = f"{site['percent_diff']:+.1f}%"
        
        # Purple for CS taking longer, orange for CS taking less time
        color = '#800080' if site['percent_diff'] > 0 else '#FFA500'
        plt.text(i, y + (ymax * 0.02), label, ha='center', va='bottom', rotation=45, color=color)
        
        # Add p-value if significant
        if site['p_value'] < 0.05:
            plt.text(i, y + (ymax * 0.15), 
                    f'p={site["p_value"]:.3f}', 
                    ha='center', va='bottom', color='red',
                    bbox=dict(facecolor='white', edgecolor='none', alpha=0.7))
    
    # Adjust y-axis limits to accommodate labels
    plt.ylim(0, ymax * 1.3)
    
    # Print statistics for verification
    print("\nWebsite-by-website statistics:")
    print("-" * 70)
    for site in website_stats:
        website_name = website_names[site['website_id']]
        print(f"{website_name}:")
        print(f"  CS Mean: {site['cs_mean']:.2f}s")
        print(f"  Non-CS Mean: {site['noncs_mean']:.2f}s")
        print(f"  Difference: {site['percent_diff']:+.1f}%")
        print(f"  p-value: {site['p_value']:.4f}")
        print()
    
    # Adjust layout and save
    plt.tight_layout()
    plt.savefig('datavis/images/cs_vs_noncs_per_website.png', dpi=300, bbox_inches='tight')
    plt.close()

def create_cs_vs_noncs_split_conditions(timing_seconds):
    """Create two bar charts comparing CS vs Non-CS groups, split by control/experimental condition."""
    # Define groups and batches
    cs_group = ['P1', 'P2', 'P4', 'P5', 'P10']
    noncs_group = ['P3', 'P6', 'P7', 'P8', 'P9', 'P11', 'P12']
    batch_A = ['P1', 'P5', 'P9']
    batch_B = ['P2', 'P6', 'P10']
    batch_C = ['P3', 'P7', 'P11']
    batch_D = ['P4', 'P8', 'P12']
    
    # Website names from make_csv_comp.py
    website_names = {i+1: name for i, name in enumerate(websites)}
    
    # Initialize data structures for control and experimental conditions
    control_cs_times = {i+1: [] for i in range(20)}
    control_noncs_times = {i+1: [] for i in range(20)}
    exp_cs_times = {i+1: [] for i in range(20)}
    exp_noncs_times = {i+1: [] for i in range(20)}
    
    # Process each participant's times
    for website_id in range(1, 21):
        idx = website_id - 1
        control_batches = [batch_A, batch_B] if idx < 10 else [batch_C, batch_D]
        exp_batches = [batch_C, batch_D] if idx < 10 else [batch_A, batch_B]
        
        # Collect control condition times
        for batch in control_batches:
            for p_id in batch:
                time = timing_seconds[p_id][idx]
                if p_id in cs_group:
                    control_cs_times[website_id].append(time)
                elif p_id in noncs_group:
                    control_noncs_times[website_id].append(time)
        
        # Collect experimental condition times
        for batch in exp_batches:
            for p_id in batch:
                time = timing_seconds[p_id][idx]
                if p_id in cs_group:
                    exp_cs_times[website_id].append(time)
                elif p_id in noncs_group:
                    exp_noncs_times[website_id].append(time)
    
    # Calculate statistics and prepare data for plotting
    def prepare_stats(cs_times, noncs_times):
        stats = []
        for website_id in range(1, 21):
            cs_mean = np.mean(cs_times[website_id])
            noncs_mean = np.mean(noncs_times[website_id])
            diff = ((cs_mean - noncs_mean) / noncs_mean) * 100 if noncs_mean != 0 else 0
            t_stat, p_value = calculate_independent_ttest(cs_times[website_id], noncs_times[website_id])
            
            stats.append({
                'website_id': website_id,
                'cs_mean': cs_mean,
                'noncs_mean': noncs_mean,
                'percent_diff': diff,
                'p_value': p_value
            })
        
        # Sort by absolute percent difference
        stats.sort(key=lambda x: abs(x['percent_diff']), reverse=True)
        return stats
    
    control_stats = prepare_stats(control_cs_times, control_noncs_times)
    exp_stats = prepare_stats(exp_cs_times, exp_noncs_times)
    
    # Create the visualization with two subplots
    fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(15, 16))
    width = 0.35
    
    def plot_condition(ax, stats, condition_name):
        x = np.arange(len(stats))
        
        # Create bars
        cs_bars = ax.bar(x - width/2, [w['cs_mean'] for w in stats], width,
                        label='CS Group', color='#ff9999')
        noncs_bars = ax.bar(x + width/2, [w['noncs_mean'] for w in stats], width,
                           label='Non-CS Group', color='#66b3ff')
        
        # Customize the plot
        ax.set_ylabel('Time (seconds)')
        ax.set_title(f'Per-Website Completion Times: CS vs Non-CS Groups ({condition_name})')
        ax.set_xticks(x)
        ax.set_xticklabels([website_names[w['website_id']] for w in stats],
                          rotation=45, ha='right')
        ax.legend()
        
        # Add percentage difference labels
        for i, site in enumerate(stats):
            if site['p_value'] < 0.05:
                label = f"{site['percent_diff']:+.1f}%*"
            else:
                label = f"{site['percent_diff']:+.1f}%"
            
            y = max(site['cs_mean'], site['noncs_mean'])
            color = '#800080' if site['percent_diff'] > 0 else '#FFA500'
            ax.text(i, y + 1, label, ha='center', va='bottom', rotation=45, color=color)
    
    # Plot both conditions
    plot_condition(ax1, control_stats, "Control Condition")
    plot_condition(ax2, exp_stats, "Experimental Condition")
    
    # Adjust layout and save
    plt.tight_layout()
    plt.savefig('datavis/images/cs_vs_noncs_split_conditions.png', dpi=300, bbox_inches='tight')
    plt.close()

def analyze_within_group_differences(timing_seconds):
    """Analyze and visualize timing differences within CS and Non-CS groups across conditions."""
    # Define groups
    cs_group = ['P1', 'P2', 'P4', 'P5', 'P10']
    noncs_group = ['P3', 'P6', 'P7', 'P8', 'P9', 'P11', 'P12']
    batch_A = ['P1', 'P5', 'P9']
    batch_B = ['P2', 'P6', 'P10']
    batch_C = ['P3', 'P7', 'P11']
    batch_D = ['P4', 'P8', 'P12']
    
    # Initialize data structures for paired analysis
    cs_paired_control = []
    cs_paired_exp = []
    noncs_paired_control = []
    noncs_paired_exp = []
    
    # Process each participant's data maintaining paired structure
    for p_id in cs_group:
        participant_control = []
        participant_exp = []
        for website_id in range(20):
            time = timing_seconds[p_id][website_id]
            if (p_id in batch_A and website_id < 10) or (p_id in batch_B and website_id < 10) or \
               (p_id in batch_C and website_id >= 10) or (p_id in batch_D and website_id >= 10):
                participant_control.append(time)
            else:
                participant_exp.append(time)
        # Add mean times for this participant to maintain paired structure
        cs_paired_control.append(np.mean(participant_control))
        cs_paired_exp.append(np.mean(participant_exp))
    
    for p_id in noncs_group:
        participant_control = []
        participant_exp = []
        for website_id in range(20):
            time = timing_seconds[p_id][website_id]
            if (p_id in batch_A and website_id < 10) or (p_id in batch_B and website_id < 10) or \
               (p_id in batch_C and website_id >= 10) or (p_id in batch_D and website_id >= 10):
                participant_control.append(time)
            else:
                participant_exp.append(time)
        # Add mean times for this participant to maintain paired structure
        noncs_paired_control.append(np.mean(participant_control))
        noncs_paired_exp.append(np.mean(participant_exp))
    
    # Calculate statistics
    def get_stats(times):
        return {
            'mean': np.mean(times),
            'std': np.std(times),
            'n': len(times)
        }
    
    cs_stats = {
        'control': get_stats(cs_paired_control),
        'experimental': get_stats(cs_paired_exp)
    }
    cs_stats['all'] = get_stats(cs_paired_control + cs_paired_exp)
    
    noncs_stats = {
        'control': get_stats(noncs_paired_control),
        'experimental': get_stats(noncs_paired_exp)
    }
    noncs_stats['all'] = get_stats(noncs_paired_control + noncs_paired_exp)
    
    # Calculate statistical significance using paired t-test
    cs_tstat, cs_pvalue = calculate_paired_ttest(cs_paired_control, cs_paired_exp)
    noncs_tstat, noncs_pvalue = calculate_paired_ttest(noncs_paired_control, noncs_paired_exp)
    
    # Create visualizations
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 6))
    width = 0.35
    
    # Plot CS group (left subplot)
    conditions = ['Overall', 'Control', 'Experimental']
    cs_means = [cs_stats['all']['mean'], cs_stats['control']['mean'], cs_stats['experimental']['mean']]
    cs_stds = [cs_stats['all']['std'], cs_stats['control']['std'], cs_stats['experimental']['std']]
    
    ax1.bar(np.arange(len(conditions)), cs_means, width, yerr=cs_stds, capsize=5, color=['#b3cde3', '#ff9999', '#66b3ff'])
    ax1.set_ylabel('Time (seconds)')
    ax1.set_title('CS Group Timing Comparison\n(n=5)')
    ax1.set_xticks(np.arange(len(conditions)))
    ax1.set_xticklabels(conditions)
    
    # Plot Non-CS group (right subplot)
    noncs_means = [noncs_stats['all']['mean'], noncs_stats['control']['mean'], noncs_stats['experimental']['mean']]
    noncs_stds = [noncs_stats['all']['std'], noncs_stats['control']['std'], noncs_stats['experimental']['std']]
    
    ax2.bar(np.arange(len(conditions)), noncs_means, width, yerr=noncs_stds, capsize=5, color=['#b3cde3', '#ff9999', '#66b3ff'])
    ax2.set_ylabel('Time (seconds)')
    ax2.set_title('Non-CS Group Timing Comparison\n(n=7)')
    ax2.set_xticks(np.arange(len(conditions)))
    ax2.set_xticklabels(conditions)
    
    # Synchronize y-axes and set minimum to 0
    max_y = max(
        max(cs_means) + max(cs_stds),
        max(noncs_means) + max(noncs_stds)
    )
    ax1.set_ylim(0, max_y * 1.2)
    ax2.set_ylim(0, max_y * 1.2)
    
    # Add mean values on bars
    for ax, means in [(ax1, cs_means), (ax2, noncs_means)]:
        for i, mean in enumerate(means):
            ax.text(i, mean + 1, f'{mean:.1f}s', ha='center', va='bottom')
    
    # Add p-values in a better position
    def add_p_value(ax, p_value, y_pos):
        if p_value < 0.05:
            ax.text(1.5, y_pos, f'p = {p_value:.3f}*', ha='center', va='bottom', fontweight='bold')
        else:
            ax.text(1.5, y_pos, f'p = {p_value:.3f}', ha='center', va='bottom')
    
    # Position p-values at 90% of the maximum y-value
    y_pos = max_y * 0.9
    add_p_value(ax1, cs_pvalue, y_pos)
    add_p_value(ax2, noncs_pvalue, y_pos)
    
    plt.tight_layout()
    plt.savefig('datavis/images/within_group_comparisons.png', dpi=300, bbox_inches='tight')
    plt.close()
    
    # Print statistical analysis
    print("\nWithin-Group Statistical Analysis")
    print("-" * 70)
    print("\nCS Group Analysis:")
    print(f"Overall:      Mean = {cs_stats['all']['mean']:.1f}s, SD = {cs_stats['all']['std']:.1f}s")
    print(f"Control:      Mean = {cs_stats['control']['mean']:.1f}s, SD = {cs_stats['control']['std']:.1f}s")
    print(f"Experimental: Mean = {cs_stats['experimental']['mean']:.1f}s, SD = {cs_stats['experimental']['std']:.1f}s")
    print(f"Control vs Experimental: t = {cs_tstat:.3f}, p = {cs_pvalue:.3f}")
    
    print("\nNon-CS Group Analysis:")
    print(f"Overall:      Mean = {noncs_stats['all']['mean']:.1f}s, SD = {noncs_stats['all']['std']:.1f}s")
    print(f"Control:      Mean = {noncs_stats['control']['mean']:.1f}s, SD = {noncs_stats['control']['std']:.1f}s")
    print(f"Experimental: Mean = {noncs_stats['experimental']['mean']:.1f}s, SD = {noncs_stats['experimental']['std']:.1f}s")
    print(f"Control vs Experimental: t = {noncs_tstat:.3f}, p = {noncs_pvalue:.3f}")
    
    return cs_stats, noncs_stats, cs_pvalue, noncs_pvalue

def print_timing_stats_latex():
    # Convert all times to seconds
    timing_seconds = {p: [time_to_seconds(t) for t in times] for p, times in timings.items()}
    
    # Define participant batches
    batch_A = ['P1', 'P5', 'P9']
    batch_B = ['P2', 'P6', 'P10']
    batch_C = ['P3', 'P7', 'P11']
    batch_D = ['P4', 'P8', 'P12']
    
    # Helper function to calculate stats
    def get_stats(times):
        return {
            'mean': np.mean(times),
            'median': np.median(times),
            'std': np.std(times)
        }
    
    # Collect all times
    all_times = []
    control_times = []
    experimental_times = []
    group_a_times = []
    group_b_times = []
    group_c_times = []
    group_d_times = []
    
    # Process each website (0-19)
    for website_id in range(20):
        # Get control times
        for batch in [batch_A, batch_B] if website_id < 10 else [batch_C, batch_D]:
            for p_id in batch:
                time = timing_seconds[p_id][website_id]
                all_times.append(time)
                control_times.append(time)
        
        # Get experimental times
        for batch in [batch_C, batch_D] if website_id < 10 else [batch_A, batch_B]:
            for p_id in batch:
                time = timing_seconds[p_id][website_id]
                all_times.append(time)
                experimental_times.append(time)
    
    # Collect group times
    for p_id in batch_A:
        group_a_times.extend(timing_seconds[p_id])
    for p_id in batch_B:
        group_b_times.extend(timing_seconds[p_id])
    for p_id in batch_C:
        group_c_times.extend(timing_seconds[p_id])
    for p_id in batch_D:
        group_d_times.extend(timing_seconds[p_id])
    
    # Calculate stats for each group
    all_stats = get_stats(all_times)
    control_stats = get_stats(control_times)
    experimental_stats = get_stats(experimental_times)
    group_a_stats = get_stats(group_a_times)
    group_b_stats = get_stats(group_b_times)
    group_c_stats = get_stats(group_c_times)
    group_d_stats = get_stats(group_d_times)
    
    # Print LaTeX table
    print(r"\begin{table}[h]")
    print(r"\centering")
    print(r"\caption{Time Spent Reading Privacy Policies (in Seconds)}")
    print(r"\label{tab:timing-statistics}")
    print(r"\begin{tabular}{lccc}")
    print(r"\hline")
    print(r"\textbf{Group} & \textbf{Mean} & \textbf{Median} & \textbf{Std Dev} \\")
    print(r"\hline")
    print(f"All Data & {all_stats['mean']:.1f} & {all_stats['median']:.1f} & {all_stats['std']:.1f} \\\\")
    print(f"Control & {control_stats['mean']:.1f} & {control_stats['median']:.1f} & {control_stats['std']:.1f} \\\\")
    print(f"Experimental & {experimental_stats['mean']:.1f} & {experimental_stats['median']:.1f} & {experimental_stats['std']:.1f} \\\\")
    print(f"Group A & {group_a_stats['mean']:.1f} & {group_a_stats['median']:.1f} & {group_a_stats['std']:.1f} \\\\")
    print(f"Group B & {group_b_stats['mean']:.1f} & {group_b_stats['median']:.1f} & {group_b_stats['std']:.1f} \\\\")
    print(f"Group C & {group_c_stats['mean']:.1f} & {group_c_stats['median']:.1f} & {group_c_stats['std']:.1f} \\\\")
    print(f"Group D & {group_d_stats['mean']:.1f} & {group_d_stats['median']:.1f} & {group_d_stats['std']:.1f} \\\\")
    print(r"\hline")
    print(r"\end{tabular}")
    print(r"\end{table}")

if __name__ == "__main__":
    analyze_timings()
    print_timing_stats_latex() 