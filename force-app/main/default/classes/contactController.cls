public class contactController {

    //Update an item
    //Accepts serialized con object
    @AuraEnabled
    public static void updateContact(String payload) {
      System.debug('payload '+payload);
      con payloadObject = (con) JSON.deserialize(payload, con.class);
  
      SObject con = (Sobject) Type.forName('Contact').newInstance();
      con.put('Id', payloadObject.conId);
      //con.put('Name', payloadObject.conName);
      con.put('Active__c', payloadObject.active);
  
      update con;
    }
  
    //Delete an item
    //Accepts id of the item to delete
    @AuraEnabled
    public static void deleteContact(String conId) {
     System.debug('Con Id'+conId);
      SObject con = (Sobject) Type.forName('Contact').newInstance();
      con.put('Id', conId);
  
      delete con;
    }
  
  
    @AuraEnabled
    public static List<con> getContactRec(String accId) {
      List<SObject> cons = Database.query(
        'SELECT Id, Name,Email, Active__c FROM Contact WHERE AccountId=:accId ORDER BY CreatedDate DESC'
      );
      return getcontacts(cons);
    }
  
    //Wrap Contact SObject into con object
    public static List<con> getcontacts(List<SObject> objs) {
      List<con> cons = new List<con>();
      for (SObject obj : objs) {
        con Con = new con();
        Con.conId = obj.Id;
        Con.conName = String.valueOf(obj.get('Name'));
        Con.active = Boolean.valueOf(obj.get('Active__c'));
        cons.add(Con);
      }
  
      return cons;
    }
  
    //Wrapper Class to represent a Contact Item
    public class con {
      @AuraEnabled
      public String conId;
      @AuraEnabled
      public String conName;
      @AuraEnabled
      public Boolean active;
    }
  }