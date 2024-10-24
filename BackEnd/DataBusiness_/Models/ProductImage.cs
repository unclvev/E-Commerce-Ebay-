using System;
using System.Collections.Generic;

namespace DataBusiness_.Models
{
    public partial class ProductImage
    {
        public string Id { get; set; } = null!;
        public string? ProductId { get; set; }
        public string? ImageUrl { get; set; }

        public virtual Product? Product { get; set; }
    }
}
