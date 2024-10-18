class TrainReportRegressor:
    def __init__(self, mse: float, mae: float, r2: float, mape: float):
        self.mse = mse
        self.mae = mae
        self.r2 = r2
        self.mape = mape
