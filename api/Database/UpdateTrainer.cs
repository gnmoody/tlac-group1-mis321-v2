using api.models;
using api.interfaces;
using MySql.Data.MySqlClient;

namespace api.Database{
    public class UpdateTrainer : IUpdateTrainer
    {
        public void Update(Trainer i){
            ConnectionString cs = new ConnectionString();
            using var con = new MySqlConnection(cs.cs);
            con.Open();
            using var cmd = new MySqlCommand();

            cmd.CommandText = @"UPDATE account SET AccountID=@email, Password=@password WHERE AcctID=(SELECT AcctID from Trainer WHERE TrainerID=@trnid);
                            UPDATE trainer SET fname=@fname, lname=@lname DOB=@dob, gender=@gender phone=@phone WHERE AccountID=@email";
            cmd.Parameters.AddWithValue("@trnid", i.trainerId);
            cmd.Parameters.AddWithValue("@email", i.email);
            cmd.Parameters.AddWithValue("@fname", i.fName);
            cmd.Parameters.AddWithValue("@lname", i.lName);
            cmd.Parameters.AddWithValue("@dob", i.birthDate);
            cmd.Parameters.AddWithValue("@gender", i.gender);
            cmd.Parameters.AddWithValue("@phone", i.phoneNo);
            cmd.Parameters.AddWithValue("@password", i.password);
            cmd.Connection=con;
            cmd.Prepare();
            cmd.ExecuteNonQuery();
            cmd.Parameters.AddWithValue("@act",null);
            IDeleteActivity deleteObj = new DeleteActivity();
            deleteObj.DeleteTrainerActivitities(i.trainerId);
            foreach(Activity act in i.trainerActivities){
                cmd.CommandText = @"INSERT into cando (TrainerID,ActivityID,Price) VALUES ((SELECT TrainerID from Trainer where AccountID=@email),@act,@price)";
                cmd.Parameters["@act"].Value= act.activityId;
                cmd.Parameters["@price"].Value = act.trainerPriceForActivity;
                cmd.Connection=con;
                cmd.Prepare();
                cmd.ExecuteNonQuery();
            }
        }
    }
}