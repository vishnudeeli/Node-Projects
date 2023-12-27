using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;

namespace potluck_backend_dotnet.Models
{
    public class Potluck
    {
        [Key]
        public int Id { get; set; }
        [RegularExpression(@"^[a-zA-Z]+[ a-zA-Z-]*$", ErrorMessage = "Pie name should contain only Characters")]

        public string EmpName { get; set; }
        [Required]

        public string EmpId { get; set; }
        [RegularExpression(@"^[a-zA-Z]+[ a-zA-Z-]*$", ErrorMessage = "Pie name should contain only Characters")]

        public string DishName { get; set; }
        [ValidateNever]

        public string DishUrl { get; set; }
        [MinLength(5, ErrorMessage = "Short Description should have 5-20 Characters")]
        [MaxLength(20, ErrorMessage = "Short Description should have 5-20 Characters")]
        [Required]

        public string Description { get; set; }
    }
}
