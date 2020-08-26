import numpy as np
import pandas as pd
import warnings 

warnings.filterwarnings('ignore')

df = pd.read_csv('./telecom_churn.csv')
df.head()