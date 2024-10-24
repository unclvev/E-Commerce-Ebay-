using System;
using System.Collections.Generic;

namespace DataBusiness_.Models
{
    public partial class UserListing
    {
        public string? UserId { get; set; }
        public string? ListingId { get; set; }

        public virtual Listing? Listing { get; set; }
        public virtual User? User { get; set; }
    }
}
