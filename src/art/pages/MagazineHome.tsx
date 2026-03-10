const MagazineHome = () => {
  const images = {
    studioView:
      "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/studio.png",
    mentorView:
      "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/jsh.jpg",
    work100_1:
      "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/work100_1.png",
    work120_process:
      "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/120_1.png",
    first:
      "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/first.png",
    love: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/60.png",
    work1:
      "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/123.png",
    work2:
      "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/456.png",
    work3:
      "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/678.png",
    work8:
      "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/120_2.png",
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto",
        backgroundColor: "#fff",
        color: "#1a1a1a",
        fontFamily: '"Noto Serif KR", serif',
      }}
    >
      {/* 1. BANNER 영역 (Height 확장 + 센터 타이틀 + 반투명 배경) */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "70vh",
          overflow: "hidden",
          marginBottom: "100px",
        }}
      >
        <img
          src={images.first}
          alt="Main Banner"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        {/* 중앙 텍스트 박스 */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(0, 0, 0, 0.4)", // 회색 투명값
            padding: "40px 60px",
            textAlign: "center",
            minWidth: "60%",
            backdropFilter: "blur(4px)", // 살짝 블러 줘서 더 고급스럽게
          }}
        >
          <h1
            style={{
              color: "#fff",
              fontSize: "32px",
              margin: 0,
              fontWeight: 500,
              letterSpacing: "2px",
            }}
          >
            2026 ART BUSAN
            <br />
            THE FIRST ARCHIVE
          </h1>
          <p
            style={{
              color: "#eee",
              fontSize: "14px",
              marginTop: "15px",
              fontWeight: 300,
            }}
          >
            아카이브의 시작, 선과 면의 기록
          </p>
        </div>
      </section>

      {/* 2. ARTWORK 영역 (스와이프 유도 레이아웃) */}
      <section style={{ marginBottom: "120px" }}>
        <p
          style={{
            fontSize: "10px",
            color: "#aaa",
            letterSpacing: "2px",
            paddingLeft: "20px",
            marginBottom: "20px",
          }}
        >
          01 SELECTED ARTWORK
        </p>

        {/* 가로 스크롤 컨테이너 */}
        <div
          style={{
            display: "flex",
            overflowX: "auto",
            paddingLeft: "20px",
            paddingRight: "20px",
            gap: "20px",
            scrollbarWidth: "none", // 파이어폭스
            msOverflowStyle: "none", // IE
          }}
        >
          {/* 각 아이템 너비를 약 75%로 설정하여 1.3개가 보이도록 유도 */}
          {[images.work1, images.work2, images.work3, images.work100_1].map(
            (img, i) => (
              <div key={i} style={{ flex: "0 0 75%", minWidth: "75%" }}>
                <img
                  src={img}
                  alt={`Work ${i}`}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
                <p
                  style={{ fontSize: "11px", color: "#999", marginTop: "10px" }}
                >
                  Piece No. 0{i + 1}
                </p>
              </div>
            ),
          )}
        </div>
        <style>{
          `.container::-webkit-scrollbar { display: none; }` /* 크롬 스크롤바 숨기기 */
        }</style>
      </section>

      {/* 이후 LOG, INSIGHT 등은 기존과 동일하되 위 섹션들의 변화에 맞춰 여백 조정 */}
      <section style={{ padding: "0 20px", marginBottom: "100px" }}>
        <p
          style={{
            fontSize: "10px",
            color: "#aaa",
            letterSpacing: "2px",
            marginBottom: "40px",
          }}
        >
          02 LOG: PROCESS
        </p>
        <div style={{ display: "flex", gap: "30px", alignItems: "flex-start" }}>
          <div style={{ flex: 4 }}>
            <img src={images.studioView} alt="Studio" />
          </div>
          <div style={{ flex: 6 }}>
            <h3 style={{ fontSize: "18px", marginTop: 0 }}>작업실 기록</h3>
            <p style={{ color: "#444", fontSize: "13px" }}>
              빛이 가장 깊게 들어오는 시간의 기록.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MagazineHome;
