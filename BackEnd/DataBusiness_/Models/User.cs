using System;
using System.Collections.Generic;

namespace DataBusiness_.Models
{
    public partial class User
    {
        public User()
        {
            Bids = new HashSet<Bid>();
            Listings = new HashSet<Listing>();
            Orders = new HashSet<Order>();
            Reviews = new HashSet<Review>();
        }

        public string Id { get; set; } = null!;
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Address { get; set; }
        public string? PhoneNumber { get; set; }

        public virtual ICollection<Bid> Bids { get; set; }
        public virtual ICollection<Listing> Listings { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }
    }
}
