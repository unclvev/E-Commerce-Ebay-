using System;
using System.Collections.Generic;

namespace DataBusiness_.Models
{
    public partial class CategoryListing
    {
        public string? CategoryId { get; set; }
        public string? ListingId { get; set; }

        public virtual Category? Category { get; set; }
        public virtual Listing? Listing { get; set; }
    }
}
