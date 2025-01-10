using System;
using System.Collections.Generic;

namespace Services.Models
{
    public class Budget
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public ICollection<Category> Categories { get; set; }
    }
}
