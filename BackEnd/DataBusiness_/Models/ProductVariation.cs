using System;
using System.Collections.Generic;

namespace DataBusiness_.Models
{
    public partial class ProductVariation
    {
        public string Id { get; set; } = null!;
        public string? ProductId { get; set; }

        public virtual Product? Product { get; set; }
    }
}
