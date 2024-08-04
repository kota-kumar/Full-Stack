function main(){
    let a = 20;
    function child(){
        let b = 20;
        console.log(a+b);
    }
    return child;
}
main()();