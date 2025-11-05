export const generateAvatarUrl = (avatar: string): string => {
    return `${process.env.NEXT_PUBLIC_APP_URL}/images/avatars/${avatar}`;
}