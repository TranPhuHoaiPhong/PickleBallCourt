import HeaderComponent from "../../../../components/UserComponent/PickleBallCourt/HeaderPickleComponent/HeaderPickleComponent";
import Introduction from "../../../../components/UserComponent/PickleBallCourt/Introduction/Introduction";
import FooterPickleCourt from "../../../../components/UserComponent/PickleBallCourt/FooterPickleCourt/FooterPickleCourt";
import CourtHeaderContainer from "../../../../pages/User/PickleBallCourt/HandlePage/CourtPickleBall/CourtPickleBall";

function CourtPickle() {
  return (
    <>
      <HeaderComponent />
      <div style={{ marginTop: "80px" }}>
        <CourtHeaderContainer />
        <div
          style={{ maxWidth: "1200px", margin: "auto", padding: "20px 10px" }}
        >
          <Introduction />
        </div>
      </div>
      
      <div><FooterPickleCourt /></div>
    </>
  );
}

export default CourtPickle;
