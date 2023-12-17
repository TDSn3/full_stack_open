import pandas as pd
import matplotlib.pyplot as plt
from datetime import datetime
import matplotlib.dates as mdates

# Charger les données depuis un fichier CSV
df = pd.read_csv('/Users/thomas/Downloads/CSVFile.csv', delimiter=';', decimal=',', parse_dates=['Heure de début', 'Heure de fin'])

# Convertir 'Durée en heures' en float
df['Durée en heures'] = df['Durée en heures'].astype(float)

# Grouper les données par date et sommer les durées
df['Date'] = df['Heure de début'].dt.date
grouped = df.groupby('Date')['Durée en heures'].sum()

# Créer le graphique
plt.figure(figsize=(15, 8))
plt.plot(grouped.index, grouped.values, marker='o')

# Formater le graphique
plt.gca().xaxis.set_major_formatter(mdates.DateFormatter('%d/%m/%Y'))
plt.gca().xaxis.set_major_locator(mdates.MonthLocator())
plt.xticks(rotation=45)
plt.xlabel('Date')
plt.ylabel('Durée Totale en Heures')
plt.title('Durée Totale des Tâches par Jour')
plt.grid(True)

# Afficher le graphique
plt.show()
