using System;
using System.Collections.Generic;

namespace DataBusiness_.Models
{
    public partial class ProductListing
    {
        public string? ProductId { get; set; }
        public string? ListingId { get; set; }

        public virtual Listing? Listing { get; set; }
        public virtual Product? Product { get; set; }
    }
}
