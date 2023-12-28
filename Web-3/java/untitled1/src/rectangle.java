import java.util.Scanner;

public class rectangle {
    double length ;
    double width;
    public void getInformation(){
        Scanner sc = new Scanner(System.in);
        System.out.print("nhap chieu dai: ");
        length = sc.nextDouble();
        System.out.print("nhap chieu rong: ");
        width = sc.nextDouble();
    }
    public double area(){
        return length*width;
    }
    public double premeter(){
        return (length+width)*2;
    }
    public void display(){
        System.out.println("Area: "+area());
        System.out.print("Perimeter: "+ premeter());
    }
}





