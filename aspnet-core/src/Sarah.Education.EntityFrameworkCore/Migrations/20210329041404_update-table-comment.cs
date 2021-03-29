using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Sarah.Education.Migrations
{
    public partial class updatetablecomment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProtectorStudentComment_ProtectorStudent_ProtectorStudentId",
                table: "ProtectorStudentComment");

            migrationBuilder.RenameColumn(
                name: "ProtectorStudentId",
                table: "ProtectorStudentComment",
                newName: "StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_ProtectorStudentComment_ProtectorStudentId",
                table: "ProtectorStudentComment",
                newName: "IX_ProtectorStudentComment_StudentId");

            migrationBuilder.AddColumn<Guid>(
                name: "ProtectorId",
                table: "ProtectorStudentComment",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_ProtectorStudentComment_ProtectorId",
                table: "ProtectorStudentComment",
                column: "ProtectorId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProtectorStudentComment_Protector_ProtectorId",
                table: "ProtectorStudentComment",
                column: "ProtectorId",
                principalTable: "Protector",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProtectorStudentComment_Student_StudentId",
                table: "ProtectorStudentComment",
                column: "StudentId",
                principalTable: "Student",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProtectorStudentComment_Protector_ProtectorId",
                table: "ProtectorStudentComment");

            migrationBuilder.DropForeignKey(
                name: "FK_ProtectorStudentComment_Student_StudentId",
                table: "ProtectorStudentComment");

            migrationBuilder.DropIndex(
                name: "IX_ProtectorStudentComment_ProtectorId",
                table: "ProtectorStudentComment");

            migrationBuilder.DropColumn(
                name: "ProtectorId",
                table: "ProtectorStudentComment");

            migrationBuilder.RenameColumn(
                name: "StudentId",
                table: "ProtectorStudentComment",
                newName: "ProtectorStudentId");

            migrationBuilder.RenameIndex(
                name: "IX_ProtectorStudentComment_StudentId",
                table: "ProtectorStudentComment",
                newName: "IX_ProtectorStudentComment_ProtectorStudentId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProtectorStudentComment_ProtectorStudent_ProtectorStudentId",
                table: "ProtectorStudentComment",
                column: "ProtectorStudentId",
                principalTable: "ProtectorStudent",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
