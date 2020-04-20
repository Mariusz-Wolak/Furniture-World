public with sharing class FW_CustomException extends Exception {
    public virtual class BaseException extends Exception {}
    public class OtherException extends BaseException {}
}