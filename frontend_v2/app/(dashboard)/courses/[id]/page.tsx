interface Props {
    params: {
        id: string;
    };
}
export default function Page({ params }: Props) {
    const { id } = params;

    return (
        <div>
            <h1>Page</h1>
        </div>
    );
}