const ArtiveMockup = () => {
  const images = {
    studioView:
      "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/studio.png",
    mentorView:
      "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/jsh.jpg",
    work100_1:
      "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/work100_1.png",
    work100_2:
      "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/100ss.png",
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
    work4:
      "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/100s.png",
    work5: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/gg.png",
    work6:
      "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/sss.png",
    work7: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/ss.png",
    work8:
      "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/120_2.png",
    work9:
      "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/rome.png",
    work10:
      "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/home.png",
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto",
        backgroundColor: "#fff",
        color: "#1a1a1a",
        fontFamily: "serif",
      }}
    >
      {/* 1. BANNER 영역 (Main) */}
      <section style={{ marginBottom: "100px" }}>
        <div style={{ width: "100%", aspectRatio: "21/9", overflow: "hidden" }}>
          <img
            src={images.first}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            alt="Main"
          />
        </div>
        <h1
          style={{
            fontSize: "24px",
            textAlign: "center",
            marginTop: "20px",
            letterSpacing: "-0.5px",
          }}
        >
          2026 ART BUSAN: THE FIRST STEP
        </h1>
      </section>

      {/* 2. ARTWORK 영역 (고정형 5개) */}
      <section style={{ marginBottom: "120px", padding: "0 20px" }}>
        <p style={{ fontSize: "10px", color: "#999", marginBottom: "20px" }}>
          01 SELECTED ARTWORK
        </p>
        {[
          images.work1,
          images.work2,
          images.work3,
          images.work4,
          images.work5,
        ].map((img, i) => (
          <div key={i} style={{ marginBottom: "60px" }}>
            <img
              src={img}
              style={{ width: "100%", height: "auto", display: "block" }}
              alt="Artwork"
            />
            <p style={{ fontSize: "11px", marginTop: "10px", color: "#666" }}>
              Series No. 0{i + 1} / 2026
            </p>
          </div>
        ))}
      </section>

      {/* 3. LOG 영역 (A/B/C 타입 혼합) */}
      <section style={{ marginBottom: "120px", padding: "0 20px" }}>
        <p style={{ fontSize: "10px", color: "#999", marginBottom: "20px" }}>
          02 LOG: PROCESS & SPACE
        </p>

        {/* Type C: 기록 밀착형 */}
        <div style={{ marginBottom: "80px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <img
              src={images.work120_process}
              style={{ width: "100%", marginBottom: "2px" }}
            />
            <img src={images.work8} style={{ width: "100%" }} />
          </div>
          <h3 style={{ fontSize: "18px", marginTop: "20px" }}>
            120호 대작의 기록
          </h3>
          <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#444" }}>
            캔버스를 마주하는 첫 순간의 긴장감. 밑색이 깔리는 과정의 층위들.
          </p>
        </div>

        {/* Type B: 서사 중심형 (좌이미지/우텍스트) */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "30px",
            marginBottom: "80px",
          }}
        >
          <img
            src={images.studioView}
            style={{ width: "40%", height: "auto" }}
          />
          <div style={{ width: "60%" }}>
            <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>
              작업실 조도
            </h3>
            <p style={{ fontSize: "13px", lineHeight: "1.6", color: "#444" }}>
              오후 4시의 빛이 가장 깊게 들어올 때, 비로소 물감의 본래 색이
              보인다.
            </p>
          </div>
        </div>
      </section>

      {/* 4. INSIGHT 영역 (B/D 타입 혼합) */}
      <section style={{ marginBottom: "120px", padding: "0 20px" }}>
        <p style={{ fontSize: "10px", color: "#999", marginBottom: "20px" }}>
          03 INSIGHT: VISION
        </p>

        {/* Type D: 메시지 강조형 */}
        <div
          style={{
            backgroundColor: "#f9f9f9",
            padding: "80px 40px",
            textAlign: "center",
            marginBottom: "80px",
          }}
        >
          <h2
            style={{
              fontSize: "28px",
              lineHeight: "1.4",
              fontWeight: "normal",
              margin: 0,
            }}
          >
            "작가는 정답을 내놓는 사람이 아니라,
            <br />
            끊임없이 질문을 던지는 사람이다."
          </h2>
        </div>

        {/* Type B: 서사 중심형 (좌텍스트/우이미지) */}
        <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
          <div style={{ width: "60%", textAlign: "right" }}>
            <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>
              멘토와의 대화
            </h3>
            <p style={{ fontSize: "13px", lineHeight: "1.6", color: "#444" }}>
              전시를 앞두고 나눈 대화들. 결국 본질은 테크닉이 아닌 태도에
              있었다.
            </p>
          </div>
          <img
            src={images.mentorView}
            style={{ width: "40%", height: "auto" }}
          />
        </div>
      </section>

      {/* 5. NEWS 영역 */}
      <section style={{ padding: "0 20px 100px 20px" }}>
        <p style={{ fontSize: "10px", color: "#999", marginBottom: "20px" }}>
          04 NEWS
        </p>
        {/* Type A: 이미지 몰입형 */}
        <div style={{ width: "100%" }}>
          <img
            src={images.love}
            style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover" }}
          />
          <h3 style={{ fontSize: "18px", marginTop: "20px" }}>
            심야미술관 기수제 모집 예고
          </h3>
          <p style={{ fontSize: "14px", color: "#444" }}>
            함께 고민하고 함께 그릴 동료들을 기다립니다.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ArtiveMockup;
