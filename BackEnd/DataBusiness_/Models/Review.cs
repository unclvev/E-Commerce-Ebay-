using System;
using System.Collections.Generic;

namespace DataBusiness_.Models
{
    public partial class Review
    {
        public string Id { get; set; } = null!;
        public string? ProductId { get; set; }
        public string? UserId { get; set; }
        public decimal? Rating { get; set; }
        public string? Comment { get; set; }
        public DateTime? ReviewDate { get; set; }

        public virtual Product? Product { get; set; }
        public virtual User? User { get; set; }
    }
}
