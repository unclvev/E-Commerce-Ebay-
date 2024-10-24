using System;
using System.Collections.Generic;

namespace DataBusiness_.Models
{
    public partial class Category
    {
        public Category()
        {
            Listings = new HashSet<Listing>();
        }

        public string Id { get; set; } = null!;
        public string? Name { get; set; }
        public string? Description { get; set; }

        public virtual ICollection<Listing> Listings { get; set; }
    }
}
