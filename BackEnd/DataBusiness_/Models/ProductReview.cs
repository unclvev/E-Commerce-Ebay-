using System;
using System.Collections.Generic;

namespace DataBusiness_.Models
{
    public partial class ProductReview
    {
        public string? ProductId { get; set; }
        public string? ReviewId { get; set; }

        public virtual Product? Product { get; set; }
        public virtual Review? Review { get; set; }
    }
}
