using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Sarah.Education.Migrations
{
    public partial class addstudytimetable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "StudyTimeId",
                table: "TimeSheetEntry",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "StudyTime",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FromHour = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    ToHour = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    SortOrder = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudyTime", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TimeSheetEntry_StudyTimeId",
                table: "TimeSheetEntry",
                column: "StudyTimeId");

            migrationBuilder.AddForeignKey(
                name: "FK_TimeSheetEntry_StudyTime_StudyTimeId",
                table: "TimeSheetEntry",
                column: "StudyTimeId",
                principalTable: "StudyTime",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TimeSheetEntry_StudyTime_StudyTimeId",
                table: "TimeSheetEntry");

            migrationBuilder.DropTable(
                name: "StudyTime");

            migrationBuilder.DropIndex(
                name: "IX_TimeSheetEntry_StudyTimeId",
                table: "TimeSheetEntry");

            migrationBuilder.DropColumn(
                name: "StudyTimeId",
                table: "TimeSheetEntry");
        }
    }
}
