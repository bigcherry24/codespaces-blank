import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function SignUpForm() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
            passwordConfirm: '',
        },
    });

    const onSubmit = async (data) => {
        setError('');

        setLoading(true);
        try {
            // API 호출 예시
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                })
            });

            if (!response.ok) throw new Error('회원가입 실패');
            alert('회원가입이 완료되었습니다.');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>회원가입</h2>
                
                {(error || errors.email || errors.password || errors.passwordConfirm) && (
                    <div className="error-message">
                        {error || errors.email?.message || errors.password?.message || errors.passwordConfirm?.message}
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="email">이메일</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="your@email.com"
                        {...register('email', {
                            required: '이메일을 입력해주세요.',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: '올바른 이메일 형식이 아닙니다.',
                            },
                        })}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="••••••••"
                        {...register('password', {
                            required: '비밀번호를 입력해주세요.',
                            minLength: {
                                value: 8,
                                message: '비밀번호는 8자 이상이어야 합니다.',
                            },
                        })}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="passwordConfirm">비밀번호 확인</label>
                    <input
                        type="password"
                        id="passwordConfirm"
                        placeholder="••••••••"
                        {...register('passwordConfirm', {
                            required: '비밀번호 확인을 입력해주세요.',
                            validate: (value) =>
                                value === watch('password') || '비밀번호가 일치하지 않습니다.',
                        })}
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? '처리 중...' : '회원가입'}
                </button>
            </form>
        </div>
    );
}