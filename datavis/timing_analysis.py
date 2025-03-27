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

def calculate_ttest(group1, group2):
    """
    Calculate t-test statistics manually.
    Returns t-statistic and approximate p-value.
    """
    n1, n2 = len(group1), len(group2)
    mean1, mean2 = np.mean(group1), np.mean(group2)
    var1, var2 = np.var(group1, ddof=1), np.var(group2, ddof=1)
    
    # Pooled standard error
    pooled_se = np.sqrt(((n1 - 1) * var1 + (n2 - 1) * var2) / (n1 + n2 - 2))
    
    # T-statistic
    t_stat = (mean1 - mean2) / (pooled_se * np.sqrt(1/n1 + 1/n2))
    
    # Approximate two-tailed p-value using normal distribution
    # (this is a rough approximation but sufficient for our needs)
    p_value = 2 * (1 - norm_cdf(abs(t_stat)))
    
    return t_stat, p_value

def norm_cdf(x):
    """
    Approximate normal cumulative distribution function.
    Uses error function approximation.
    """
    return 0.5 * (1 + erf(x / np.sqrt(2)))

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
        t_stat, p_value = calculate_ttest(website_control, website_experimental)
        
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
    t_stat, p_value = calculate_ttest(control_times, experimental_times)
    
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

if __name__ == "__main__":
    analyze_timings() 