using System;
using System.Collections.Generic;

namespace DataBusiness_.Models
{
    public partial class Color
    {
        public Color()
        {
            Products = new HashSet<Product>();
        }

        public string Id { get; set; } = null!;
        public string? Name { get; set; }

        public virtual ICollection<Product> Products { get; set; }
    }
}
