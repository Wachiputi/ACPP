## SETUP
1. Navigate to the project directory:
   ```sh
   cd ACPPBA
   ```
2.  pip -m venv venv

3. .\.venv\Scripts\activate

4. IF system denies execution policies  

    -- Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
    then retry 3

5. Install the required Python packages using pip:
   ```sh
   pip install -r requirements.txt
   ```

## Usage

1. Run the Streamlit app:
   ```sh
   streamlit run app.py
   ```
   auto re-run use 👇👇
   streamlit run --server.runOnSave true app.py

2. The app will open in your default web browser. Use the sidebar to choose options for visualization, recent data display, or making price predictions.

3. Follow the on-screen instructions to input the stock symbol, select a date range, and choose technical indicators or prediction models.

## Technologies

- Python
- Streamlit
- pandas
- scikit-learn
- streamlit
- numpy
- matplotlib
- tensorflow


