using System;
using System.Collections.Generic;

namespace DataBusiness_.Models
{
    public partial class Promotion
    {
        public string Id { get; set; } = null!;
        public double? PrValue { get; set; }
        public string? PrDescription { get; set; }
        public string? ProductId { get; set; }

        public virtual Product? Product { get; set; }
    }
}
