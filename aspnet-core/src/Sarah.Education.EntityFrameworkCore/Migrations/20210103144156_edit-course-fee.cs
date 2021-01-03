using Microsoft.EntityFrameworkCore.Migrations;

namespace Sarah.Education.Migrations
{
    public partial class editcoursefee : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsSingle",
                table: "CourseFee");

            migrationBuilder.AddColumn<double>(
                name: "FeeMultiple",
                table: "CourseFee",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FeeMultiple",
                table: "CourseFee");

            migrationBuilder.AddColumn<bool>(
                name: "IsSingle",
                table: "CourseFee",
                type: "bit",
                nullable: true);
        }
    }
}
