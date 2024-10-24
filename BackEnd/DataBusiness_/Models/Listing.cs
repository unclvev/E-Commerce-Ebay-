using System;
using System.Collections.Generic;

namespace DataBusiness_.Models
{
    public partial class Listing
    {
        public Listing()
        {
            Bids = new HashSet<Bid>();
        }

        public string Id { get; set; } = null!;
        public string? ProductId { get; set; }
        public string? SellerId { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public decimal? StartPrice { get; set; }
        public decimal? CurrentPrice { get; set; }
        public string? CategoryId { get; set; }

        public virtual Category? Category { get; set; }
        public virtual Product? Product { get; set; }
        public virtual User? Seller { get; set; }
        public virtual ICollection<Bid> Bids { get; set; }
    }
}
