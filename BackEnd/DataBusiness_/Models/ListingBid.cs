using System;
using System.Collections.Generic;

namespace DataBusiness_.Models
{
    public partial class ListingBid
    {
        public string? ListingId { get; set; }
        public string? BidId { get; set; }

        public virtual Bid? Bid { get; set; }
        public virtual Listing? Listing { get; set; }
    }
}
