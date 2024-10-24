using System;
using System.Collections.Generic;

namespace DataBusiness_.Models
{
    public partial class UserReview
    {
        public string? UserId { get; set; }
        public string? ReviewId { get; set; }

        public virtual Review? Review { get; set; }
        public virtual User? User { get; set; }
    }
}
