import { renderSidebar } from "./rendering.js";
import { fetchDocuments } from "./utils.js";

// 새 페이지 생성
document.addEventListener("DOMContentLoaded", function () {
  // 이벤트 리스너
  const button = document.getElementById("new-page__button");
  if (button) {
    button.addEventListener("click", async function (e) {
      e.preventDefault();
      console.log("새 페이지 버튼이 클릭되었습니다!");
      const parentId = history.state?.id;
      await createNewPage(parentId);
    });
  } else {
    console.log("버튼을 찾을 수 없습니다.");
  }
});
//
// api입력
export async function createNewPage(parentId) {
  try {
    const response = await fetch("https://kdt-api.fe.dev-cos.com/documents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-username": "potatoes",
      },
      body: JSON.stringify({
        title: "",
        content: "",
        parent: parentId, // parentId 추가
      }),
    });
    if (!response.ok) {
      alert("새 페이지 생성에 실패했습니다. 다시 시도해주세요.");
      throw new Error("새 페이지 생성에 실패했습니다.");
    }
    const newPageData = await response.json();
    console.log("API 응답 데이터:", newPageData);

    const documents = await fetchDocuments();
    renderSidebar(documents);
  } catch (error) {
    console.error("페이지 생성 중 오류 발생:", error);
    alert("페이지 생성 중 오류가 발생했습니다. 네트워크 상태를 확인해주세요.");
  }
}

// 사이드바 열고 닫기
document.addEventListener("DOMContentLoaded", function () {
  const closeSidebarBtn = document.getElementById("close-sidebar-btn");
  const openSidebarBtn = document.getElementById("open-sidebar-btn");
  const sidebar = document.getElementById("side-bar");

  // 사이드바 닫기 버튼 클릭 시
  closeSidebarBtn.addEventListener("click", function () {
    sidebar.classList.add("closed");
    openSidebarBtn.classList.remove("hidden");
  });

  // 메뉴 버튼 클릭 시 사이드바 열기
  openSidebarBtn.addEventListener("click", function () {
    sidebar.classList.remove("closed");
    openSidebarBtn.classList.add("hidden");
  });
});