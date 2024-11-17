ALTER TABLE OrderSummary
    ADD CONSTRAINT FK_OrderSummary_Payments
        FOREIGN KEY (PaymentID)
            REFERENCES Payments(PaymentID);
