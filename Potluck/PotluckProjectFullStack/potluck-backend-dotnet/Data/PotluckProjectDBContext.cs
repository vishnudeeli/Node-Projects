using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using potluck_backend_dotnet.Models;

namespace potluck_backend_dotnet.Data
{
    public class PotluckProjectDBContext : DbContext
    {
        public PotluckProjectDBContext(DbContextOptions<potluck_backend_dotnet.Data.PotluckProjectDBContext> options)
            : base(options)
        {
        }

        public DbSet<potluck_backend_dotnet.Models.Potluck> Potluck { get; set; }
    }
}

