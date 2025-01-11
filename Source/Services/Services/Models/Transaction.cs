using System;

namespace Services.Models
{
    public class Transaction
    {
        public Guid Id { get; set; }
        public Guid BudgetId { get; set; }
        public DateTime Date { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; }
        public bool IsExpense { get; set; }
    }
}
