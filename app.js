// 等待 DOM 加載完成
document.addEventListener("DOMContentLoaded", () => {

    const pages = document.querySelectorAll('.page');
    const navButtons = document.querySelectorAll('.nav-btn');
    const publishModal = document.getElementById('modal-publish');

    // --- 核心導航函數 ---
    function showPage(pageId) {
        // 隱藏所有頁面
        pages.forEach(page => {
            page.classList.remove('active');
        });

        // 顯示目標頁面
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // 如果我們在樹洞，就為 body 添加特殊樣式
        if (pageId === 'page-treehole') {
            document.body.classList.add('treehole-mode-bg');
        } else {
            document.body.classList.remove('treehole-mode-bg');
        }
    }

    // --- 綁定底部導航欄 ---
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const pageId = button.getAttribute('data-page');
            showPage(pageId);
        });
    });

    // --- Flow 1: 首次啟動與 onboarding ---
    document.getElementById('btn-goto-select-idols').addEventListener('click', () => {
        showPage('page-select-idols');
    });

    document.getElementById('btn-finish-onboarding').addEventListener('click', () => {
        // 註冊成功，進入主頁
        showPage('page-discover');
    });

    // --- Flow 2: 日常瀏覽與互動 (內容循環) ---
    // 顯示發布彈窗
    document.getElementById('btn-show-publish').addEventListener('click', () => {
        publishModal.style.display = 'block';
    });

    // 關閉發布彈窗
    document.getElementById('btn-close-publish').addEventListener('click', () => {
        publishModal.style.display = 'none';
    });

    // 模擬發布
    document.getElementById('btn-submit-publish').addEventListener('click', () => {
        publishModal.style.display = 'none';
        // 實際應用中，這裡會提交數據
        alert('發布成功！');
        // 跳轉回發現頁 (如果不在的話)
        showPage('page-discover');
        // 這裡還可以動態在 'page-discover' 的 <main> 中插入新貼文
    });

    // --- Flow 4: 情緒釋放 (樹洞循環) ---
    document.getElementById('btn-goto-treehole').addEventListener('click', () => {
        // 從「我的」頁面進入「樹洞」
        showPage('page-treehole');
    });

    document.getElementById('btn-exit-treehole').addEventListener('click', () => {
        // 從「樹洞」退出，返回「我的」頁面
        showPage('page-profile');
    });


    // --- Flow 3 & 5 (示例) ---
    // 這些頁面已通過底部導航欄綁定，無需額外 JS 即可切換。
    // 匹配、群組、我的 (儀表板)

    // --- 應用啟動 ---
    // 應用啟動時，默認顯示登錄頁面
    // 為了演示方便，我們直接跳到登錄頁 (它已有 .active)
    // showPage('page-login'); 
    // 如果要跳過登錄直接看主頁，取消下面這行註釋：
    // showPage('page-discover');
});

// --- PWA Service Worker 註冊 ---
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker 註冊成功: ', registration.scope);
            })
            .catch(error => {
                console.log('ServiceWorker 註冊失敗: ', error);
            });
    });
}
