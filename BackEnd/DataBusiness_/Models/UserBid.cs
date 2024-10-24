using System;
using System.Collections.Generic;

namespace DataBusiness_.Models
{
    public partial class UserBid
    {
        public string? UserId { get; set; }
        public string? BidId { get; set; }

        public virtual Bid? Bid { get; set; }
        public virtual User? User { get; set; }
    }
}
