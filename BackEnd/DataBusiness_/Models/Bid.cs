using System;
using System.Collections.Generic;

namespace DataBusiness_.Models
{
    public partial class Bid
    {
        public string Id { get; set; } = null!;
        public string? ListingId { get; set; }
        public string? UserId { get; set; }
        public decimal? BidAmount { get; set; }
        public DateTime? BidTime { get; set; }

        public virtual Listing? Listing { get; set; }
        public virtual User? User { get; set; }
    }
}
