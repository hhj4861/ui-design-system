"""
studio_ui/components/auth.py
인증 관련 UI 컴포넌트 - 로그인, 회원가입, 로그아웃, OAuth
"""

import streamlit as st
from typing import Optional
from dataclasses import dataclass

from studio_ui.core.styles import inject_css


@dataclass
class AuthFormResult:
    """인증 폼 결과"""
    email: str
    password: str
    submitted: bool
    oauth_provider: Optional[str] = None  # "google", "github" 등


@dataclass
class SignupFormResult:
    """회원가입 폼 결과"""
    email: str
    password: str
    password_confirm: str
    submitted: bool
    oauth_provider: Optional[str] = None

    @property
    def passwords_match(self) -> bool:
        """비밀번호 일치 여부"""
        return self.password == self.password_confirm


def _auth_styles() -> None:
    """인증 폼 공통 스타일 - 디자인 시스템 적용"""
    inject_css("""
        /* 인증 컨테이너 */
        .auth-card {
            max-width: 420px;
            margin: 1rem auto;
            padding: 2rem 2.5rem;
            background: #fffdfb;
            border: 1px solid #e8e2d9;
            border-radius: 1.5rem;
            box-shadow: 0 4px 12px rgba(201,168,124,0.15);
        }

        /* 헤더 */
        .auth-header {
            text-align: center;
            margin-bottom: 1.5rem;
        }
        .auth-title {
            font-size: 1.75rem;
            font-weight: 700;
            color: #2d251f;
            margin-bottom: 0.5rem;
        }
        .auth-subtitle {
            font-size: 0.875rem;
            color: #8b7355;
        }

        /* 입력 필드 스타일 - 강화 */
        .stApp div[data-testid="stTextInput"] > div,
        .auth-card div[data-testid="stTextInput"] > div {
            background: #faf8f5 !important;
        }
        .stApp div[data-testid="stTextInput"] input,
        .stApp input[type="text"],
        .stApp input[type="email"],
        .stApp input[type="password"],
        .auth-card div[data-testid="stTextInput"] input {
            background: #faf8f5 !important;
            border: 1px solid #e8e2d9 !important;
            border-radius: 0.75rem !important;
            padding: 0.875rem 1rem !important;
            font-size: 0.875rem !important;
            color: #2d251f !important;
            transition: all 0.2s ease !important;
            -webkit-text-fill-color: #2d251f !important;
        }
        .stApp div[data-testid="stTextInput"] input:focus,
        .auth-card div[data-testid="stTextInput"] input:focus {
            border-color: #c9a87c !important;
            box-shadow: 0 0 0 3px rgba(201,168,124,0.2) !important;
            outline: none !important;
        }
        .stApp div[data-testid="stTextInput"] input::placeholder,
        .auth-card div[data-testid="stTextInput"] input::placeholder {
            color: #8b7355 !important;
            -webkit-text-fill-color: #8b7355 !important;
        }

        /* 입력 필드 라벨 */
        .stApp div[data-testid="stTextInput"] label,
        .auth-card label {
            color: #2d251f !important;
        }

        /* 구분선 */
        .auth-divider {
            display: flex;
            align-items: center;
            margin: 1.5rem 0;
            color: #8b7355;
            font-size: 0.75rem;
        }
        .auth-divider::before,
        .auth-divider::after {
            content: '';
            flex: 1;
            border-bottom: 1px solid #e8e2d9;
        }
        .auth-divider::before { margin-right: 1rem; }
        .auth-divider::after { margin-left: 1rem; }

        /* OAuth 버튼 */
        .oauth-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
            width: 100%;
            padding: 0.875rem 1rem;
            background: #fffdfb;
            border: 1px solid #e8e2d9;
            border-radius: 0.75rem;
            font-size: 0.875rem;
            font-weight: 500;
            color: #2d251f;
            cursor: pointer;
            transition: all 0.2s ease;
            text-decoration: none;
            margin-bottom: 0.75rem;
        }
        .oauth-btn:hover {
            border-color: #c9a87c;
            background: #faf8f5;
            box-shadow: 0 2px 8px rgba(201,168,124,0.2);
        }
        .oauth-btn img {
            width: 20px;
            height: 20px;
        }

        /* 푸터 */
        .auth-footer {
            text-align: center;
            margin-top: 1.5rem;
            font-size: 0.875rem;
            color: #5c4a3d;
        }
        .auth-footer a {
            color: #c9a87c;
            text-decoration: none;
            font-weight: 600;
        }
        .auth-footer a:hover {
            text-decoration: underline;
        }

        /* 에러/성공 메시지 */
        .auth-error {
            background: #fef2f2;
            color: #dc3545;
            padding: 0.75rem 1rem;
            border-radius: 0.75rem;
            font-size: 0.875rem;
            margin-bottom: 1rem;
            border: 1px solid rgba(220,53,69,0.2);
        }
        .auth-success {
            background: #e8f5ed;
            color: #4a9d6b;
            padding: 0.75rem 1rem;
            border-radius: 0.75rem;
            font-size: 0.875rem;
            margin-bottom: 1rem;
            border: 1px solid rgba(74,157,107,0.2);
        }

        /* 링크 텍스트 */
        .auth-link {
            text-align: right;
            margin-bottom: 1rem;
        }
        .auth-link a {
            font-size: 0.75rem;
            color: #8b7355;
            text-decoration: none;
        }
        .auth-link a:hover {
            color: #c9a87c;
        }
    """, key="auth_styles_v2")


def google_oauth_button(
    label: str = "Google로 계속하기",
    key: str = "google_oauth",
) -> bool:
    """
    Google OAuth 버튼

    Args:
        label: 버튼 텍스트
        key: 컴포넌트 키

    Returns:
        bool: 클릭 여부
    """
    # Google 로고 SVG
    google_logo = """<svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>"""

    clicked = st.button(
        f"🔵 {label}",
        key=key,
        use_container_width=True,
        type="secondary",
    )

    return clicked


def login_form(
    title: str = "로그인",
    subtitle: str = "계정에 로그인하세요",
    email_placeholder: str = "이메일을 입력하세요",
    password_placeholder: str = "비밀번호를 입력하세요",
    submit_label: str = "로그인",
    signup_text: str = "계정이 없으신가요?",
    signup_link_text: str = "회원가입",
    forgot_password_text: str = "비밀번호를 잊으셨나요?",
    show_forgot_password: bool = True,
    show_google_oauth: bool = True,
    key: str = "login_form",
) -> AuthFormResult:
    """
    로그인 폼 UI 컴포넌트

    Args:
        title: 폼 제목
        subtitle: 폼 부제목
        email_placeholder: 이메일 입력 플레이스홀더
        password_placeholder: 비밀번호 입력 플레이스홀더
        submit_label: 제출 버튼 텍스트
        signup_text: 회원가입 안내 텍스트
        signup_link_text: 회원가입 링크 텍스트
        forgot_password_text: 비밀번호 찾기 텍스트
        show_forgot_password: 비밀번호 찾기 링크 표시 여부
        show_google_oauth: Google OAuth 버튼 표시 여부
        key: 컴포넌트 키

    Returns:
        AuthFormResult: 입력값과 제출 상태
    """
    _auth_styles()

    oauth_provider = None

    with st.container():
        st.markdown('<div class="auth-card">', unsafe_allow_html=True)

        # 헤더
        st.markdown(f"""
            <div class="auth-header">
                <div class="auth-title">{title}</div>
                <div class="auth-subtitle">{subtitle}</div>
            </div>
        """, unsafe_allow_html=True)

        # Google OAuth
        if show_google_oauth:
            if google_oauth_button(key=f"{key}_google"):
                oauth_provider = "google"

            st.markdown('<div class="auth-divider">또는</div>', unsafe_allow_html=True)

        # 이메일 입력
        email = st.text_input(
            "이메일",
            placeholder=email_placeholder,
            key=f"{key}_email",
            label_visibility="collapsed",
        )

        # 비밀번호 입력
        password = st.text_input(
            "비밀번호",
            type="password",
            placeholder=password_placeholder,
            key=f"{key}_password",
            label_visibility="collapsed",
        )

        # 비밀번호 찾기 링크
        if show_forgot_password:
            st.markdown(f"""
                <div class="auth-link">
                    <a href="#">{forgot_password_text}</a>
                </div>
            """, unsafe_allow_html=True)

        # 로그인 버튼
        submitted = st.button(
            submit_label,
            key=f"{key}_submit",
            type="primary",
            use_container_width=True,
        )

        # 푸터
        st.markdown(f"""
            <div class="auth-footer">
                {signup_text} <a href="#">{signup_link_text}</a>
            </div>
        """, unsafe_allow_html=True)

        st.markdown('</div>', unsafe_allow_html=True)

    return AuthFormResult(
        email=email,
        password=password,
        submitted=submitted,
        oauth_provider=oauth_provider,
    )


def signup_form(
    title: str = "회원가입",
    subtitle: str = "새 계정을 만드세요",
    email_placeholder: str = "이메일을 입력하세요",
    password_placeholder: str = "비밀번호를 입력하세요",
    password_confirm_placeholder: str = "비밀번호를 다시 입력하세요",
    submit_label: str = "회원가입",
    login_text: str = "이미 계정이 있으신가요?",
    login_link_text: str = "로그인",
    show_google_oauth: bool = True,
    key: str = "signup_form",
) -> SignupFormResult:
    """
    회원가입 폼 UI 컴포넌트

    Args:
        title: 폼 제목
        subtitle: 폼 부제목
        email_placeholder: 이메일 입력 플레이스홀더
        password_placeholder: 비밀번호 입력 플레이스홀더
        password_confirm_placeholder: 비밀번호 확인 플레이스홀더
        submit_label: 제출 버튼 텍스트
        login_text: 로그인 안내 텍스트
        login_link_text: 로그인 링크 텍스트
        show_google_oauth: Google OAuth 버튼 표시 여부
        key: 컴포넌트 키

    Returns:
        SignupFormResult: 입력값과 제출 상태
    """
    _auth_styles()

    oauth_provider = None

    with st.container():
        st.markdown('<div class="auth-card">', unsafe_allow_html=True)

        # 헤더
        st.markdown(f"""
            <div class="auth-header">
                <div class="auth-title">{title}</div>
                <div class="auth-subtitle">{subtitle}</div>
            </div>
        """, unsafe_allow_html=True)

        # Google OAuth
        if show_google_oauth:
            if google_oauth_button(label="Google로 회원가입", key=f"{key}_google"):
                oauth_provider = "google"

            st.markdown('<div class="auth-divider">또는 이메일로 가입</div>', unsafe_allow_html=True)

        # 이메일
        email = st.text_input(
            "이메일",
            placeholder=email_placeholder,
            key=f"{key}_email",
            label_visibility="collapsed",
        )

        # 비밀번호
        password = st.text_input(
            "비밀번호",
            type="password",
            placeholder=password_placeholder,
            key=f"{key}_password",
            label_visibility="collapsed",
        )

        # 비밀번호 확인
        password_confirm = st.text_input(
            "비밀번호 확인",
            type="password",
            placeholder=password_confirm_placeholder,
            key=f"{key}_password_confirm",
            label_visibility="collapsed",
        )

        # 비밀번호 불일치 경고
        if password and password_confirm and password != password_confirm:
            st.markdown("""
                <div class="auth-error">비밀번호가 일치하지 않습니다</div>
            """, unsafe_allow_html=True)

        # 회원가입 버튼
        submitted = st.button(
            submit_label,
            key=f"{key}_submit",
            type="primary",
            use_container_width=True,
        )

        # 푸터
        st.markdown(f"""
            <div class="auth-footer">
                {login_text} <a href="#">{login_link_text}</a>
            </div>
        """, unsafe_allow_html=True)

        st.markdown('</div>', unsafe_allow_html=True)

    return SignupFormResult(
        email=email,
        password=password,
        password_confirm=password_confirm,
        submitted=submitted,
        oauth_provider=oauth_provider,
    )


def logout_button(
    label: str = "로그아웃",
    icon: str = "",
    confirm: bool = False,
    confirm_message: str = "정말 로그아웃 하시겠습니까?",
    button_type: str = "secondary",
    key: str = "logout_btn",
) -> bool:
    """
    로그아웃 버튼 UI 컴포넌트

    Args:
        label: 버튼 텍스트
        icon: 아이콘 (선택)
        confirm: 확인 다이얼로그 표시 여부
        confirm_message: 확인 메시지
        button_type: 버튼 타입 ("primary" | "secondary")
        key: 컴포넌트 키

    Returns:
        bool: 로그아웃 클릭 여부
    """
    btn_label = f"{icon} {label}".strip() if icon else label

    if confirm:
        if st.button(btn_label, key=key, type=button_type):
            st.session_state[f"{key}_confirm"] = True

        if st.session_state.get(f"{key}_confirm"):
            st.warning(confirm_message)
            col1, col2 = st.columns(2)
            with col1:
                if st.button("취소", key=f"{key}_cancel", use_container_width=True):
                    st.session_state[f"{key}_confirm"] = False
                    st.rerun()
            with col2:
                if st.button("확인", key=f"{key}_confirm_btn", type="primary", use_container_width=True):
                    st.session_state[f"{key}_confirm"] = False
                    return True
        return False
    else:
        return st.button(btn_label, key=key, type=button_type)


def user_menu(
    user_email: str,
    user_name: Optional[str] = None,
    show_settings: bool = True,
    key: str = "user_menu",
) -> Optional[str]:
    """
    사용자 메뉴 드롭다운 UI 컴포넌트

    Args:
        user_email: 사용자 이메일
        user_name: 사용자 이름 (선택)
        show_settings: 설정 메뉴 표시 여부
        key: 컴포넌트 키

    Returns:
        선택된 메뉴 ("settings" | "logout" | None)
    """
    inject_css("""
        .user-menu-info {
            padding: 0.75rem 0;
            border-bottom: 1px solid #e8e2d9;
            margin-bottom: 0.5rem;
        }
        .user-menu-name {
            font-weight: 600;
            font-size: 0.875rem;
            color: #2d251f;
        }
        .user-menu-email {
            font-size: 0.75rem;
            color: #8b7355;
        }
    """, key="user_menu_styles_v2")

    display_name = user_name or user_email.split("@")[0]

    with st.popover(f"👤 {display_name}"):
        st.markdown(f"""
            <div class="user-menu-info">
                <div class="user-menu-name">{display_name}</div>
                <div class="user-menu-email">{user_email}</div>
            </div>
        """, unsafe_allow_html=True)

        result = None

        if show_settings:
            if st.button("⚙️ 설정", key=f"{key}_settings", use_container_width=True):
                result = "settings"

        if st.button("🚪 로그아웃", key=f"{key}_logout", use_container_width=True):
            result = "logout"

        return result


def auth_container(
    title: Optional[str] = None,
    subtitle: Optional[str] = None,
):
    """
    인증 폼을 감싸는 컨테이너

    Example:
        >>> with auth_container(title="로그인", subtitle="계정에 로그인하세요"):
        ...     email = st.text_input("이메일")
        ...     password = st.text_input("비밀번호", type="password")
    """
    _auth_styles()

    st.markdown('<div class="auth-card">', unsafe_allow_html=True)

    if title or subtitle:
        st.markdown(f"""
            <div class="auth-header">
                {f'<div class="auth-title">{title}</div>' if title else ''}
                {f'<div class="auth-subtitle">{subtitle}</div>' if subtitle else ''}
            </div>
        """, unsafe_allow_html=True)

    return st.container()
